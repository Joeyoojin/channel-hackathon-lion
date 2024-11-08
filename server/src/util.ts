import axios from 'axios';
import * as crypto from 'crypto';
// import { createClient } from '@supabase/supabase-js';
// import Groq from 'groq-sdk';

require("dotenv").config();

let channelTokenMap = new Map<string, [string, string, number]>();

const defaultWamArgs = ["rootMessageId", "broadcast", "isPrivate"];

// const supabase = createClient(
//     process.env.SUPABASE_URL ?? '',
//     process.env.SUPABASE_ANON_KEY ?? ''
// );

// const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

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
                    name: "interview",
                    scope: "desk",
                    description: "면접 일정을 신청합니다",
                    actionFunctionName: "interview",
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

function interview(wamName: string, callerId: string, params: any) {
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
    
}

async function interviewAction(channelId: string, groupId: string, broadcast: boolean, rootMessageId?: string) {
    
}

async function interviewScheduleStatus(channelId: string, groupId: string, broadcast: boolean, rootMessageId?: string) {
    
}

export { requestIssueToken, registerCommand, verification, apply, interview, faq, result, applyAction, interviewAction, interviewScheduleStatus };
