'use strict';

import { Router } from 'express';

import Ajv from '../utils/Ajv.mjs';
import ErrorHandler from '../middlewares/errors/errorHandler.middleware.mjs';
import SuccessHandler from '../middlewares/Success/SuccessHandler.middleware.mjs';
import { userModel } from '../api/users/User.schema.mjs';
import userSchema from './user.schema.mjs';


const router = new Router();
const ajv = new Ajv(userSchema);


router.post("/", async function (req, res) {
    const error = ajv.validate(req.body);
    if (error) { return res.status(422).json(ErrorHandler({ code: 422_001, error: error })); }

    try {
        const user = await userModel.register(new userModel({ email: req.body.email, username: req.body.username }), req.body.password);
        if (!user) { return res.status(500).json(ErrorHandler({ code: 500_001, error: error })); }

        req.login(user, function (error) {
            if (error) { return res.status(500).json(ErrorHandler({ code: 500_002, error: error })); }

            // jwt.sign({ userId: user._id, email: user.email, username: user.username, role: user.role }, 'secret', { expiresIn: '6h' });
            res.status(201).json(SuccessHandler({
                code: 201_001,
                data: {
                    email: user.email,
                    username: user.username,
                    role: user.role
                }
            }));
        });
    } catch (error) {
        return res.status(500).json(ErrorHandler({ code: 500_000, error: error }));
    }
});


export default router;
