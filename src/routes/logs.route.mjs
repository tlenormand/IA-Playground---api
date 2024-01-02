'use strict';

import { Router } from 'express';

import Ajv from '../utils/Ajv.mjs';
import ErrorHandler from '../middlewares/errors/errorHandler.middleware.mjs';
import SuccessHandler from '../middlewares/Success/SuccessHandler.middleware.mjs';
import logsSchema from './logs.schema.mjs';
import LogsCRUD from '../api/logs/Logs.api.mjs';


const router = new Router();


router.get("/get/", async function (req, res) {
    const ajv = new Ajv(logsSchema.get);
    const error = ajv.validate(req.query);
    if (error) { return res.status(422).json(ErrorHandler({ code: 422_001, error: error })); }

    try {
        const data = await new LogsCRUD().get(req.query);
        res.status(200).json(SuccessHandler({
            code: 200_000,
            data: data,
        }));
    }
    catch (err) {
        res.status(500).json(ErrorHandler({ code: 500_000, error: err }));
    }
});

router.post("/create/", async function (req, res) {
    const ajv = new Ajv(logsSchema.create);
    const error = ajv.validate(req.body);
    if (error) { return res.status(422).json(ErrorHandler({ code: 422_001, error: error })); }

	try {
        const data = await new LogsCRUD().createOne(req.body);
        res.status(200).json(SuccessHandler({
            code: 200_200,
            data: data,
        }));
	} catch (err) {
		res.status(500).json(ErrorHandler({ code: 500_000, error: err }));
	}
});


router.post("/find/", async function (req, res) {
    const ajv = new Ajv(logsSchema.find);
    const error = ajv.validate(req.body);
    if (error) { return res.status(422).json(ErrorHandler({ code: 422_001, error: error })); }

	try {
        const data = await new LogsCRUD().find(req.body);
        res.status(200).json(SuccessHandler({
            code: 200_003,
            data: data,
        }));
	} catch (err) {
		res.status(500).json(ErrorHandler({ code: 500_000, error: err }));
	}
});

router.get("/stats/", async function (req, res) {
    const ajv = new Ajv(logsSchema.stats.GET);
    const error = ajv.validate(req.query);
    if (error) { return res.status(422).json(ErrorHandler({ code: 422_001, error: error })); }

    try {
        const data = await new LogsCRUD().stats(req.query);
        res.status(200).json(SuccessHandler({
            code: 200_000,
            data: data,
        }));
    }
    catch (err) {
        res.status(500).json(ErrorHandler({ code: 500_000, error: err }));
    }
});

router.post("/stats/", async function (req, res) {
    const ajv = new Ajv(logsSchema.stats.POST);
    const error = ajv.validate(req.query);
    if (error) { return res.status(422).json(ErrorHandler({ code: 422_001, error: error })); }

    try {
        const data = await new LogsCRUD().stats(req.query, req.body);
        res.status(200).json(SuccessHandler({
            code: 200_000,
            data: data,
        }));
    }
    catch (err) {
        res.status(500).json(ErrorHandler({ code: 500_000, error: err }));
    }
});

export default router;
