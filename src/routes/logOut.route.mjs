/* global requestWrapper */

import { Router } from 'express';

import UserController from '../controller/User.controller.mjs';


const router = new Router();

router.get('/', requestWrapper(async (req, res) => {
    return {
        code: 200_006,
        data: await new UserController(req.user).logout(req, res)
    };
}));


export default router;
