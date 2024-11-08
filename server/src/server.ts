import express, { Request, Response } from 'express';
import path from 'path';
import { requestIssueToken, registerCommand, apply, faq, result, applyAction, interviewScheduleRegister, interviewScheduleStatus, resultCheck, verification } from './util';


require("dotenv").config();

const app = express();

const WAM_NAMES = {
    APPLY: 'apply',
    FAQ: 'faq',
    RESULT: 'result'
}

async function startServer() {
    const [accessToken, refreshToken, expiresAt]: [string, string, number] = await requestIssueToken();
    await registerCommand(accessToken);
}

async function functionHandler(body: any) {
    const method = body.method;
    const callerId = body.context.caller.id;
    const channelId = body.context.channel.id;

    switch (method) {
        case 'apply': // apply wam 띄우기
            return apply(WAM_NAMES.APPLY, callerId, body.params);
        case 'faq': // faq wam 띄우기
            return faq(WAM_NAMES.FAQ, callerId, body.params);
        case 'result': // result wam 띄우기
            return result(WAM_NAMES.RESULT, callerId, body.params);
        case 'apply-action': // apply wam 액션처리 (제출 완료 버튼 눌렀을 때)
            await applyAction(
                channelId,
                body.params.input.username,
                body.params.input.email,
                body.params.input.resumeData,
                body.params.input.groupId,
                body.params.input.broadcast,
                body.params.input.rootMessageId
            );
            return ({result: {}});
        case 'interview-schedule-register': // interview wam 액션처리 (면접일정 신청 버튼 눌렀을 때)
            await interviewScheduleRegister(
                channelId,
                body.params.input.username,
                body.params.input.email,
                body.params.input.interviewDates,
                body.params.input.groupId,
                body.params.input.broadcast,
                body.params.input.rootMessageId,
            );
            return ({result: {}});
        case 'interview-schedule-status': // 면접일정 상태 확인
            await interviewScheduleStatus(
                channelId,
                body.params.input.groupId,
                body.params.input.broadcast,
                body.params.input.rootMessageId
            );
            return ({result: {}});
        case 'result-check': // 지원 결과 확인
            await resultCheck(
                body.params.input.username,
                body.params.input.email
            );
            return ({result: {}});
        // case 'tutorial':
        //     return tutorial(WAM_NAME, callerId, body.params);
        // case 'sendAsBot':
        //     await sendAsBot(
        //         channelId,
        //         body.params.input.groupId,
        //         body.params.input.broadcast,
        //         body.params.input.rootMessageId
        //     );
        //     return ({result: {}});
    }
}

async function server() {
    try {
        await startServer();

        app.use(express.json());
        // app.use(`/resource/wam/${WAM_NAME}`, express.static(path.join(__dirname, '../../wam/dist')));
        app.use(`/resource/wam/${WAM_NAMES.APPLY}`, express.static(path.join(__dirname, '../../apply-wam/dist')));
        app.use(`/resource/wam/${WAM_NAMES.FAQ}`, express.static(path.join(__dirname, '../../faq-wam/dist')));
        app.use(`/resource/wam/${WAM_NAMES.RESULT}`, express.static(path.join(__dirname, '../../result-wam/dist')));

        app.put('/functions', (req: Request, res: Response) => {
            if (typeof req.headers['x-signature'] !== 'string' || verification(req.headers['x-signature'], JSON.stringify(req.body)) === false) {
                res.status(401).send('Unauthorized');
            }
            functionHandler(req.body).then(result => {
                res.send(result);
            });
        });

        app.listen(process.env.PORT, () => {
            console.log(`Server is running at http://localhost:${process.env.PORT}`);
        });
    } catch (error: any) {
        console.error('Error caught:', error);
    }
}

export { server };
