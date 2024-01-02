'use strict';

import { Router } from 'express';

import Ajv from '../utils/Ajv.mjs';
import ErrorHandler from '../middlewares/errors/errorHandler.middleware.mjs';
import SuccessHandler from '../middlewares/Success/SuccessHandler.middleware.mjs';
import atariSchema from './atari.schema.mjs';
import AtariCRUD from '../api/atari/atari.api.mjs';


const router = new Router();
const AtariCRUDInstance = new AtariCRUD();


router.post("/reset/", async function (req, res) {
    const ajv = new Ajv(atariSchema.env.reset);
    const error = ajv.validate(req.body);
    if (error) { return res.status(422).json(ErrorHandler({ code: 422_001, error: error })); }

	try {
        const data = await AtariCRUDInstance.reset(req.body);
        res.status(200).json(SuccessHandler({
            code: 200_101,
            data: data,
        }));
	} catch (err) {
		res.status(500).json(ErrorHandler({ code: 500_000, error: err }));
	}
});

router.post("/create/", async function (req, res) {
    const ajv = new Ajv(atariSchema.env.create);
    const error = ajv.validate(req.body);
    if (error) { return res.status(422).json(ErrorHandler({ code: 422_001, error: error })); }

	try {
        const data = await AtariCRUDInstance.create(req.body);
        res.status(200).json(SuccessHandler({
            code: 200_100,
            data: data,
        }));
	} catch (err) {
		res.status(500).json(ErrorHandler({ code: 500_000, error: err }));
	}
});

router.post("/destroy/", async function (req, res) {
    const ajv = new Ajv(atariSchema.env.create);
    const error = ajv.validate(req.body);
    if (error) { return res.status(422).json(ErrorHandler({ code: 422_001, error: error })); }

    try {
        const data = await AtariCRUDInstance.destroy(req.body);
        res.status(200).json(SuccessHandler({
            code: 200_102,
            data: data,
        }));
    } catch (err) {
        res.status(500).json(ErrorHandler({ code: 500_000, error: err }));
    }
});

router.post("/step/", async function (req, res) {
    const ajv = new Ajv(atariSchema.env.step);
    const error = ajv.validate(req.body);
    if (error) { return res.status(422).json(ErrorHandler({ code: 422_001, error: error })); }

	try {
        const data = await AtariCRUDInstance.step(req.body);
        res.status(200).json(SuccessHandler({
            code: 200_110,
            data: data,
        }));
	} catch (err) {
		res.status(500).json(ErrorHandler({ code: 500_000, error: err }));
	}
});

router.post("/train/start/", async function (req, res) {
    const ajv = new Ajv(atariSchema.env.train.start);
    const error = ajv.validate(req.body);
    if (error) { return res.status(422).json(ErrorHandler({ code: 422_001, error: error })); }

	try {
        const data = await AtariCRUDInstance.startTrainning(req.body);
        res.status(200).json(SuccessHandler({
            code: 200_300,
            data: data,
        }));
	} catch (err) {
		res.status(500).json(ErrorHandler({ code: 500_000, error: err }));
	}
});

router.post("/train/stop/", async function (req, res) {
    const ajv = new Ajv(atariSchema.env.train.stop);
    const error = ajv.validate(req.body);
    if (error) { return res.status(422).json(ErrorHandler({ code: 422_001, error: error })); }

	try {
        const data = await AtariCRUDInstance.stopTrainning(req.body);
        res.status(200).json(SuccessHandler({
            code: 200_300,
            data: data,
        }));
	} catch (err) {
		res.status(500).json(ErrorHandler({ code: 500_000, error: err }));
	}
});


export default router;
