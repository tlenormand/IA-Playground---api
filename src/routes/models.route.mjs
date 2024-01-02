'use strict';

import { Router } from 'express';
import { ObjectId } from 'mongodb';

import Ajv from '../utils/Ajv.mjs';
import ErrorHandler from '../middlewares/errors/errorHandler.middleware.mjs';
import SuccessHandler from '../middlewares/Success/SuccessHandler.middleware.mjs';
import modelsSchema from './models.schema.mjs';
import ModelsCRUD from '../api/models/Models.api.mjs';
import DockersCRUD from '../api/dockers/Dockers.api.mjs';


const router = new Router();


router.post("/create/", async function (req, res) {
    const ajv = new Ajv(modelsSchema);
    const error = ajv.validate(req.body);
    if (error) { return res.status(422).json(ErrorHandler({ code: 422_001, error: error })); }

	try {
        const modelData = await new ModelsCRUD().createOne(req.body);
        res.status(200).json(SuccessHandler({
            code: 200_220,
            data: modelData
        }));
	} catch (err) {
        const errorCode = err.code || 500_000;
        const status = (errorCode === 409_002) ? 409 : 500;
        res.status(status).json(ErrorHandler({ code: errorCode, error: err.message }));
	}
});

router.post("/find/", async function (req, res) {
    const ajv = new Ajv(modelsSchema);
    const error = ajv.validate(req.body);
    if (error) { return res.status(422).json(ErrorHandler({ code: 422_001, error: error })); }

	try {
        const data = await new ModelsCRUD().find(req.body);
        res.status(200).json(SuccessHandler({
            code: 200_223,
            data: data,
        }));
	} catch (err) {
		res.status(500).json(ErrorHandler({ code: 500_000, error: err }));
	}
});

router.get("/get/", async function (req, res) {
	try {
        console.log(req.query);
        const data = await new ModelsCRUD().get(req.query);
        res.status(200).json(SuccessHandler({
            code: 200_223,
            data: data,
        }));
	} catch (err) {
		res.status(500).json(ErrorHandler({ code: 500_000, error: err }));
	}
});

router.get("/delete/", async function (req, res) {
    try {
        const data = await new ModelsCRUD().deleteOne(req.query);
        res.status(200).json(SuccessHandler({
            code: 200_222,
            data: data,
        }));
    } catch (err) {
        res.status(500).json(ErrorHandler({ code: 500_000, error: err }));
    }
});


export default router;
