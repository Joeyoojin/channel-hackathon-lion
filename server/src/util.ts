import axios from 'axios';
import * as crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';
import Groq from 'groq-sdk';

require("dotenv").config();

let channelTokenMap = new Map<string, [string, string, number]>();

const defaultWamArgs = ["rootMessageId", "broadcast", "isPrivate"];

const supabase = createClient(
    process.env.SUPABASE_URL ?? '',
    process.env.SUPABASE_ANON_KEY ?? ''
);

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function getChannelToken(channelId: string): Promise<[string, string]> {
    const channelToken = channelTokenMap.get(channelId);
    if (channelToken === undefined || channelToken[2] < new Date().getTime() / 1000) {
        const [accessToken, refreshToken, expiresAt]: [string, string, number] = await requestIssueToken(channelId);
        channelTokenMap.set(channelId, [accessToken, refreshToken, expiresAt]);
        return [accessToken, refreshToken]
    }
    else {
        return [channelToken[0], channelToken[1]]
    }
}

async function requestIssueToken(channelId?: string): Promise<[string, string, number]> {
    let body = {
        method: 'issueToken',
        params: {
            secret: process.env.APP_SECRET,
            channelId: channelId
        }
    };

    const headers = {
        'Content-Type': 'application/json'
    };

    const response = await axios.put(process.env.APPSTORE_URL ?? '', body, { headers });

    const accessToken = response.data.result.accessToken;
    const refreshToken = response.data.result.refreshToken;
    const expiresAt = new Date().getTime() / 1000 + response.data.result.expiresIn - 5;

    return [accessToken, refreshToken, expiresAt];
}

async function registerCommand(accessToken: string) {
    const body = {
        method: "registerCommands",
        params: {
            appId: process.env.APP_ID,
            commands: [
                {
                    name: "apply",
                    scope: "desk",
                    description: "입부 지원서를 작성합니다",
                    actionFunctionName: "apply",
                    alfMode: "disable",
                    enabledByDefault: true,
                },
                {
                    name: "faq",
                    scope: "desk",
                    description: "지원 관련 정보를 확인합니다",
                    actionFunctionName: "faq",
                    alfMode: "disable",
                    enabledByDefault: true,
                },
                {
                    name: "result",
                    scope: "desk",
                    description: "지원 결과를 확인합니다",
                    actionFunctionName: "result",
                    alfMode: "disable",
                    enabledByDefault: true,
                }
            ]
        }
    };

    const headers = {
        'x-access-token': accessToken,
        'Content-Type': 'application/json'
    };

    const response = await axios.put(process.env.APPSTORE_URL ?? '', body, { headers });

    if (response.data.error != null) {
        throw new Error("register command error");
    }
}

function verification(x_signature: string, body: string): boolean {
    const key: crypto.KeyObject = crypto.createSecretKey(Buffer.from(process.env.SIGNING_KEY ?? '', 'hex'));
    const mac = crypto.createHmac('sha256', key);
    mac.update(body, 'utf8');

    const signature: string = mac.digest('base64');
    return signature === x_signature;
}

function apply(wamName: string, callerId: string, params: any) {
    const wamArgs = {
        managerId: callerId,
    } as { [key: string]: any }

    if (params.trigger.attributes) {
        defaultWamArgs.forEach(k => {
            if (k in params.trigger.attributes) {
                wamArgs[k] = params.trigger.attributes[k]
            }
        })
    }

    return ({
        result: {
            type: "wam",
            attributes: {
                appId: process.env.APP_ID,
                name: wamName,
                wamArgs: wamArgs,
            }
        }
    });
}

function faq(wamName: string, callerId: string, params: any) {
    const wamArgs = {
        managerId: callerId,
    } as { [key: string]: any }

    if (params.trigger.attributes) {
        defaultWamArgs.forEach(k => {
            if (k in params.trigger.attributes) {
                wamArgs[k] = params.trigger.attributes[k]
            }
        })
    }

    return ({
        result: {
            type: "wam",
            attributes: {
                appId: process.env.APP_ID,
                name: wamName,
                wamArgs: wamArgs,
            }
        }
    });
}

function result(wamName: string, callerId: string, params: any) {
    const wamArgs = {
        managerId: callerId,
    } as { [key: string]: any }

    if (params.trigger.attributes) {
        defaultWamArgs.forEach(k => {
            if (k in params.trigger.attributes) {
                wamArgs[k] = params.trigger.attributes[k]
            }
        })
    }

    return ({
        result: {
            type: "wam",
            attributes: {
                appId: process.env.APP_ID,
                name: wamName,
                wamArgs: wamArgs,
            }
        }
    });
}

async function applyAction(channelId: string, groupId: string, broadcast: boolean, rootMessageId?: string) {
    // 어떤 식으로든 지원서를 받아온다고 합시다
    const resume_data = [{"Q1": "질문1", "A1": "답변1"}, {"Q2": "질문2", "A2": "답변2"}, {"Q3": "질문3", "A3": "답변3"}];
    // 어떻게 받아와 !!!
    const processedResults = [];
    
    for (const item of resume_data) {
        try {
            const prompt = `
다음은 자기소개서 내용입니다.

1. 답변에서 개인을 식별할 수 있는 정보(이름, 학교명, 회사명, 지역명, 특정 대회명, 조직명 등)를 모두 단어 단위로 '***'로 마스킹하세요.
   - 예시:
     - "저는 서울대학교를 졸업했습니다." → "저는 ***를 졸업했습니다."
     - "삼성전자에서 인턴십을 했습니다." → "***에서 인턴십을 했습니다."

2. 질문-답변 쌍에 대해 면접에서 나올 수 있는 예상 질문을 한국어로 3개 생성하세요.
   - 예상 질문은 답변 내용을 기반으로 생성하세요.

자기소개서 내용:
질문: "${item.Q1}"
답변: "${item.A1}"

출력 형식:
{
    "question": "원래 질문",
    "answer": "마스킹된 답변",
    "interview_question1": "예상 질문1",
    "interview_question2": "예상 질문2",
    "interview_question3": "예상 질문3"
}

반드시 위의 출력 형식과 동일하게 JSON 형식으로 출력하고, 모든 내용은 한국어로 작성해주세요.
`;

            const completion = await groq.chat.completions.create({
                messages: [
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                model: "mixtral-8x7b-32768"
            });

            const content = completion.choices[0]?.message?.content;
            if (!content) continue;

            // JSON 부분 추출 (정규식 사용)
            const match = content.match(/\{[\s\S]*\}/);
            if (!match) continue;

            const result = JSON.parse(match[0]);
            processedResults.push(result);

        } catch (error) {
            console.error("처리 중 오류 발생:", error);
            processedResults.push({
                question: item.Q1,
                answer: item.A1,
                interview_question1: "** 에러 발생으로 예상 질문 생성 불가 **",
                interview_question2: "** 에러 발생으로 예상 질문 생성 불가 **",
                interview_question3: "** 에러 발생으로 예상 질문 생성 불가 **"
            });
            continue;
        }
    }

    // 처리된 결과를 메시지로 변환
    let sendAsBotMsg = "📝 지원서 분석 결과\n\n";
    processedResults.forEach((result, index) => {
        sendAsBotMsg += `[${index + 1}번째 질문]\n`;
        sendAsBotMsg += `질문: ${result.question}\n`;
        sendAsBotMsg += `답변: ${result.answer}\n\n`;
        sendAsBotMsg += `💡 예상 면접 질문:\n`;
        sendAsBotMsg += `1. ${result.interview_question1}\n`;
        sendAsBotMsg += `2. ${result.interview_question2}\n`;
        sendAsBotMsg += `3. ${result.interview_question3}\n\n`;
        sendAsBotMsg += `${'-'.repeat(30)}\n\n`;
    });

    const body = {
        method: "writeGroupMessage",
        params: {
            channelId: channelId,
            groupId: groupId,
            rootMessageId: rootMessageId,
            broadcast: broadcast,
            dto: {
                plainText: sendAsBotMsg,
                botName: "지원서 분석 봇"
            }
        }
    }

    const channelToken = await getChannelToken(channelId);

    const headers = {
        'x-access-token': channelToken[0],
        'Content-Type': 'application/json'
    };

    try {
        const response = await axios.put(process.env.APPSTORE_URL ?? '', body, { headers });

        if (response.data.error != null) {
            throw new Error("메시지 전송 중 오류 발생");
        }
    } catch (error) {
        console.error("메시지 전송 실패:", error);
        throw error;
    }
}

async function interviewAction(channelId: string, groupId: string, broadcast: boolean, rootMessageId?: string) {
    // 어떤 식으로든 면접 선택 일정을 받아온다고 합시다
    const user_name = "홍길동";
    const user_email = "hong@gmail.com";
    const interview_dates = [["2024-11-10", "14"], ["2024-11-10", "15"], ["2024-11-12", "16"]];
    // 어떻게 받아와 !!!

    try {
        const { data: insertData, error } = await supabase
            .from('interview-schedule')
            .insert(
                interview_dates.map(([date, time]) => ({
                    applicant_name: user_name,
                    applicant_email: user_email, 
                    interview_date: date,
                    interview_time: parseInt(time)
                }))
            );

        if (error) {
            throw error;
        }

        // 메시지 포맷팅
        let sendAsBotMsg = "✅ 면접 일정 등록 완료\n\n";
        sendAsBotMsg += `신청자: ${user_name} (${user_email})\n\n`;
        sendAsBotMsg += "📅 선택하신 면접 시간:\n";
        interview_dates.forEach(([date, time]) => {
            sendAsBotMsg += `• ${date} ${time}:00\n`;
        });
        
        const body = {
            method: "writeGroupMessage",
            params: {
                channelId: channelId,
                groupId: groupId,
                rootMessageId: rootMessageId,
                broadcast: broadcast,
                dto: {
                    plainText: sendAsBotMsg,
                    botName: "면접 일정 관리 봇"
                }
            }
        };

        const channelToken = await getChannelToken(channelId);
        const headers = {
            'x-access-token': channelToken[0],
            'Content-Type': 'application/json'
        };

        const response = await axios.put(process.env.APPSTORE_URL ?? '', body, { headers });
        if (response.data.error != null) {
            throw new Error("메시지 전송 중 오류 발생");
        }

    } catch (error) {
        console.error("면접 일정 등록 중 오류 발생:", error);
        throw error;
    }
}

async function interviewScheduleStatus(channelId: string, groupId: string, broadcast: boolean, rootMessageId?: string) {
    try {
        // Supabase에서 면접일정 신청 데이터 조회
        const { data: schedules, error } = await supabase
            .from('interview_schedule')
            .select('interview_date, interview_time, applicant_name, applicant_email')
            .order('interview_date')
            .order('interview_time');

        if (error) {
            throw error;
        }

        // (날짜, 시간)별로 지원자 grouping
        const groupedSchedules = schedules.reduce((acc: any, curr) => {
            const key = `${curr.interview_date}_${curr.interview_time}`;
            if (!acc[key]) {
                acc[key] = {
                    date: curr.interview_date,
                    time: curr.interview_time,
                    applicants: []
                };
            }
            acc[key].applicants.push(`${curr.applicant_name} (${curr.applicant_email})`);
            return acc;
        }, {});


        let sendAsBotMsg = "📋 면접 일정 현황\n\n";
        Object.values(groupedSchedules).forEach((schedule: any) => {
            sendAsBotMsg += `📅 ${schedule.date} ${schedule.time}:00\n`;
            schedule.applicants.forEach((applicant: string) => {
                sendAsBotMsg += `• ${applicant}\n`;
            });
            sendAsBotMsg += "\n";
        });

        const body = {
            method: "writeGroupMessage",
            params: {
                channelId: channelId,
                groupId: groupId,
                rootMessageId: rootMessageId,
                broadcast: broadcast,
                dto: {
                    plainText: sendAsBotMsg,
                    botName: "면접 일정 관리 봇"
                }
            }
        };

        const channelToken = await getChannelToken(channelId);
        const headers = {
            'x-access-token': channelToken[0],
            'Content-Type': 'application/json'
        };

        const response = await axios.put(process.env.APPSTORE_URL ?? '', body, { headers });
        if (response.data.error != null) {
            throw new Error("메시지 전송 중 오류 발생");
        }

    } catch (error) {
        console.error("면접 일정 조회 중 오류 발생:", error);
        throw error;
    }
}

export { requestIssueToken, registerCommand, verification, apply, faq, result, applyAction, interviewAction, interviewScheduleStatus };
