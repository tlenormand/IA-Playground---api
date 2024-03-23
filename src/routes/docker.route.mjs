/* global requestWrapper */

import { Router } from 'express';

import DockersController from '../controller/Dockers.controller.mjs';


const router = new Router();

router.post('/create/', requestWrapper(async function (req) {
    return {
        code: 200_240,
        data: await new DockersController().createOne(req.body)
    };
}));


export default router;
