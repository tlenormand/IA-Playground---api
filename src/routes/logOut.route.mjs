'use strict';

import { Router } from 'express';

import ErrorHandler from '../middlewares/errors/errorHandler.middleware.mjs';
import SuccessHandler from '../middlewares/Success/SuccessHandler.middleware.mjs';


const router = new Router();

router.get('/', async (req, res) => {
    req.logout((error) => {  // Passport's method to remove the user from the session
        if (error) { return res.status(500).json(ErrorHandler({ code: 500_007, error: error })); }

        req.session.destroy(); // Destroy the session to clear any user data
        res.clearCookie('connect.sid').status(200).json(SuccessHandler({ code: 200_006 }));
    });
});


export default router;
