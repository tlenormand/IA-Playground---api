'use strict';

import { Router } from 'express';

import Ajv from '../utils/Ajv.mjs';
import ErrorHandler from '../middlewares/errors/errorHandler.middleware.mjs';
import rolesMiddleware from '../middlewares/roles.middleware.mjs';
import SuccessHandler from '../middlewares/Success/SuccessHandler.middleware.mjs';
import User from '../api/users/User.api.mjs';
import userSchema from './user.schema.mjs';


const router = new Router();
const ajv = new Ajv(userSchema);

router.get('/', rolesMiddleware('admin'), async (req, res) => {
	const error = ajv.validate(req.query);
	if (error) { return res.status(422).json(ErrorHandler({ code: 422_001, error: error })); }

	try {
		const user = await new User().find(req.query);

		res.status(200).json(SuccessHandler({ code: 200_000, data: user }));
	} catch (error) {
		res.status(500).json(ErrorHandler({ code: 500_000, error: error }));
	}
});

router.post('/many', rolesMiddleware('admin'), async (req, res) => {
	const error = ajv.validate(req.body);
	if (error) { return res.status(422).json(ErrorHandler({ code: 422_001, error: error })); }

	try {
		const user = await new User().createMany(req.body);

		res.status(201).json(SuccessHandler({ code: 201_000, data: user }));
	} catch (err) {
		res.status(500).json(ErrorHandler({ code: 500_000, error: err }));
	}
});

router.put('/', rolesMiddleware('user'), async (req, res) => {
	const error = ajv.validate(req.body);
	if (error) { return res.status(422).json(ErrorHandler({ code: 422_001, error: error })); }

	try {
		const newData = await new User().updateOne(req.user._id, req.body);

		res.status(200).json(SuccessHandler({ code: 200_002, data: newData }));
	} catch (err) {
		return res.status(500).json(ErrorHandler({ code: 500_000, error: err }));
	}
});

router.delete('/', rolesMiddleware('user'), async (req, res) => {
	const error = ajv.validate(req.body);
	if (error) { return res.status(422).json(ErrorHandler({ code: 422_001, error: error })); }

	try {
		const result = await new User().deleteOne(req.user);

		// destroy session
		req.session.destroy();
		res.clearCookie('connect.sid').status(200).json(SuccessHandler({ code: 200_003, data: result }));
	} catch (err) {
		res.status(500).json(ErrorHandler({ code: 500_000, error: err }));
	}
});


export default router;
