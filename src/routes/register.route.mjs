/* global requestWrapper */

import { Router } from 'express';

import UserController from '../controller/User.controller.mjs';


const router = new Router();


router.post('/', requestWrapper(async function (req, res) {
    const result = await new UserController(req.user).register(req, res);

    return {
        code: result.code,
        data: result.data
    };
}));


export default router;
