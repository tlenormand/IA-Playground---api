/* global requestWrapper */

import { Router } from 'express';

import ModelsController from '../controller/Models.controller.mjs';


const router = new Router();


router.post('/', requestWrapper(async function (req) {
    return {
        code: 200_220,
        data: await new ModelsController(req.user).createOne(req.body)
    };
}));

router.get('/', requestWrapper(async function (req) {
    return {
        code: 200_000,
        data: await new ModelsController(req.user).get(req.query)
    };
}));

router.delete('/', requestWrapper(async function (req) {
    return {
        code: 200_222,
        data: await new ModelsController(req.user).deleteOne(req.body, req.query)
    };
}));

router.post('/find/', requestWrapper(async function (req) {
    return {
        code: 200_223,
        data: await new ModelsController(req.user).find(req.body)
    };
}));


export default router;
