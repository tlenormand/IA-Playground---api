/* global requestWrapper */

import { Router } from 'express';

import LoginController from '../controller/login.controller.mjs';


const router = new Router();
const loginController = new LoginController();


router.post('/', requestWrapper(async (req, res, next) => {
    return await loginController.loginMiddleware.bind(loginController)(req, res, next)
}));


export default router;
