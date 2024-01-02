'use strict';

import jwt from 'jsonwebtoken';
import passport from 'passport';
import { Router } from 'express';

import Ajv from '../utils/Ajv.mjs';
import ErrorHandler from '../middlewares/errors/errorHandler.middleware.mjs';
import loginSchema from './login.schema.mjs';
import SuccessHandler from '../middlewares/Success/SuccessHandler.middleware.mjs';
import { userModel } from '../api/users/User.schema.mjs';


const router = new Router();
const ajv = new Ajv(loginSchema);

router.post("/", async (req, res, next) => {
    const error = ajv.validate(req.body);
    if (error) { return res.status(422).json(ErrorHandler({ code: 422_001, error: error })); }

    if (req.isAuthenticated()) { return res.status(409).json(ErrorHandler({ code: 409_001, error: { user: req.user } })); }

    // TODO: use passport-local-mongoose to authenticate
    // const authenticate = userModel.authenticate();
    // authenticate(req.body.email, req.body.password, function(error, result) {
    //     if (error) { return res.status(500).json(ErrorHandler({ code: 500_000, error: err })); }
    // })

    try {
        passport.authenticate("local", (error, user, info) => {
            if (error) { return res.status(500).json(ErrorHandler({ code: 500_000, error: error })); }
            if (!user) { return res.status(404).json(ErrorHandler({ code: 404_003 })); }

            req.logIn(user, (error) => {
                if (error) { return res.status(500).json(ErrorHandler({ code: 500_002, error: error })); }

                jwt.sign({ userId: user._id, email: user.email, username: user.username, role: user.role }, 'secret', { expiresIn: '6h' });
                res.status(200).json(SuccessHandler({
                    code: 200_007,
                    data: {
                        email: user.email,
                        username: user.username,
                        role: user.role
                    }
                }));
            });
        }) (req, res, next);
    } catch (error) {
        return res.status(500).json(ErrorHandler({ code: 500_000, error: error }));
    }
  });


export default router;
