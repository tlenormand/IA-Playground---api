'use strict';

import { Router } from 'express';

import Ajv from '../utils/Ajv.mjs';
import ErrorHandler from '../middlewares/errors/errorHandler.middleware.mjs';
import SuccessHandler from '../middlewares/Success/SuccessHandler.middleware.mjs';
import { dockersModel } from '../api/dockers/Dockers.schema.mjs';
import dockerSchema from './docker.schema.mjs';
import DockersCRUD from '../api/dockers/Dockers.api.mjs';


const router = new Router();


router.post("/create/", async function (req, res) {
    const ajv = new Ajv(dockerSchema);
    const error = ajv.validate(req.body);
    if (error) { return res.status(422).json(ErrorHandler({ code: 422_001, error: error })); }

	try {
        const data = await new DockersCRUD().createOne(req.body);
        res.status(200).json(SuccessHandler({
            code: 200_240,
            data: data,
        }));
	} catch (err) {
		res.status(500).json(ErrorHandler({ code: 500_000, error: err }));
	}
});


export default router;
