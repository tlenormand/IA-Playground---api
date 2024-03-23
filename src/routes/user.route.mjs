/* global requestWrapper */

import { Router } from 'express';

import UserController from '../controller/User.controller.mjs';


const router = new Router();

router.post('/', requestWrapper(async (req) => {
    return {
        code: 201_000,
        data: await new UserController(req.user).createMany(req.body)
    };
}));

router.get('/', requestWrapper(async (req) => {
    return {
        code: 200_000,
        data: await new UserController(req.user).find(req.query)
    };
}));

router.put('/', requestWrapper(async (req) => {
    return {
        code: 200_002,
        data: await new UserController(req.user).updateOne(req.user._id, req.body)
    };
}));

router.delete('/', requestWrapper(async (req, res) => {
    const userInstance = new UserController(req.user);

    userInstance.logout(req, res);

    return {
        code: 200_003,
        data: await userInstance.deleteOne()
    };
}));


export default router;
