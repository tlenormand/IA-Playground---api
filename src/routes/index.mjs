'use strict';

// setup authentication strategies;
// import 'middlewares/authentication/active-directory';
// import 'middlewares/authentication/jwt';
// import 'middlewares/authentication/basic';

// import { IS_PROD } from 'config/env';
import { Router } from 'express';
import isAuthenticated from '../middlewares/auth.middleware.mjs';
import loggerMiddleware from '../middlewares/accessLogger.middleware.mjs';
import passport from 'passport';
// import passport from 'passport';
// import bodyParser from 'body-parser';
// import catchAllHandler from 'middlewares/catch-all';
// import internalErrorHandler from 'middlewares/internal-errors';
// import wsErrorHandler from 'middlewares/webservice-errors';
import registerRoute from './register.route.mjs';
import logInRoute from './logIn.route.mjs';
import logOutRoute from './logOut.route.mjs';
import userRoute from './user.route.mjs';
import atariRoute from './atari.route.mjs';
import logsRoute from './logs.route.mjs';
import modelsRoute from './models.route.mjs';
import dockerRoute from './docker.route.mjs';
// import passwordRouter from './password';
// import apiRouter from './api';
// import logsRouter from './logs';
// import resourcesRouter from './resources';

const router = new Router();

// middlewares
router.use(loggerMiddleware); // log requests first
// router.use(bodyParser.json()); // parse request content
// router.use(passport.initialize()); // authenticate request

// API routes
router.use('/api/register', registerRoute);
router.use('/api/logIn', logInRoute);
router.use('/api/logOut', isAuthenticated, logOutRoute);
router.use('/api/user', isAuthenticated, userRoute);
router.use('/api/atari', atariRoute);  // isAuthenticated
router.use('/api/logs', logsRoute);  // isAuthenticated
router.use('/api/models', isAuthenticated, modelsRoute);  // isAuthenticated
router.use('/api/dockers', dockerRoute);  // isAuthenticated
// router.use('/api/user', userRoute);
// router.use('/password', passwordRouter);
// router.use('/api', apiRouter);
// router.use('/resources', resourcesRouter);

// DEBUG route
// if (!IS_PROD) {
// 	router.use('/logs', logsRouter);
// }

// catch all
// router.use(catchAllHandler);

// error middlewares
// router.use(internalErrorHandler);
// router.use(wsErrorHandler);


export default router;
