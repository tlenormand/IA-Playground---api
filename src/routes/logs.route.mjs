/* global requestWrapper */

import { Router } from 'express';

import LogsController from '../controller/Logs.controller.mjs';


const router = new Router();


router.get('/get/', requestWrapper(async function (req) {
    return {
        code: 200_000,
        data: await new LogsController(req.user).get(req.query)
    };
}));

router.post('/create/', requestWrapper(async function (req) {
    return {
        code: 200_203,
        data: await new LogsController(req.user).createOne(req.body)
    };
}));

router.post('/find/', requestWrapper(async function (req) {
    return {
        code: 200_201,
        data: await new LogsController(req.user).find(req.body)
    };
}));

router.get('/stats/', requestWrapper(async function (req) {
    return {
        code: 200_000,
        data: await new LogsController(req.user).stats(req.query)
    };
}));

router.post('/stats/', requestWrapper(async function (req) {
    return {
        code: 200_000,
        data: await new LogsController(req.user).stats(req.query, req.body)
    };
}));

export default router;
