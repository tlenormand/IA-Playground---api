/* global requestWrapper */

import { Router } from 'express';

import AtariController from '../controller/atari.controller.mjs';


const router = new Router();
const AtariControllerInstance = new AtariController();

router.post('/', requestWrapper(async function (req) {
    return {
        code: 201_100,
        data: await AtariControllerInstance.create(req.body)
    };
}));

router.post('/reset/', requestWrapper(async function (req) {
    return {
        code: 200_101,
        data: await AtariControllerInstance.reset(req.body)
    };
}));

router.post('/destroy/', requestWrapper(async function (req) {
    return {
        code: 200_102,
        data: await AtariControllerInstance.destroy(req.body)
    };
}));

router.post('/step/', requestWrapper(async function (req) {
    return {
        code: 200_110,
        data: await AtariControllerInstance.step(req.body)
    };
}));

router.post('/train/start/', requestWrapper(async function (req) {
    return {
        code: 200_300,
        data: await AtariControllerInstance.startTrainning(req.body)
    };
}));

router.post('/train/stop/', requestWrapper(async function (req) {
    return {
        code: 200_300,
        data: await AtariControllerInstance.stopTrainning(req.body)
    };
}));


export default router;
