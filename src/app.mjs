// import * as logging from 'utils/logging';
import http from 'http';
import https from 'https';
import express, { response } from 'express';
import cors from 'cors';
// import decodeURL from './middlewares/decodeURI.middleware.mjs';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { ENV } from './config/env.mjs';
import passport from 'passport';
import { validatorMiddleware, requestWrapper, responseHandler } from './middlewares/index.mjs';
import accessLoggerMiddleware from './middlewares/accessLogger.middleware.mjs';
import authenticationMiddleware from './middlewares/authentication.middleware.mjs';
import authorizationMiddleware from './middlewares/authorization.middleware.mjs';
import session from 'express-session';
import LocalStrategy from 'passport-local';
import cookieSession from 'cookie-session';
import userModel from './api/users/User.schema.mjs';
// import { PORT, SHUTDOWN_TIMEOUT } from 'config/server';
import { CORS_WHITELIST } from './config/cors.mjs';
import jwt from 'jsonwebtoken';
import './global/global.mjs';

import { isConnected } from './db/AbstractDB.mjs';

// init routing
import router from './routes/index.mjs';
// import corsMiddleware from './middlewares/cors.mjs';
const PORT = 3000;
const HOST = '127.0.0.1';  // host for local dev
const SECRET = 'secret';
// const HOST = '0.0.0.0';  // host for docker container
const SHUTDOWN_TIMEOUT = 10000;
// const options = {
// 	key: fs.readFileSync('/mnt/c/Users/lenor/Desktop/shared/perso/apiSample/https/key.pem'),
// 	cert: fs.readFileSync('/mnt/c/Users/lenor/Desktop/shared/perso/apiSample/https/cert.pem')
// };

export default class App {
	async start() {
		Global.logAll(`Using environment: ${ENV}`);
		// this.server = https.createServer(options, await this.getExpressApp());
		this.server = http.createServer(await this.getExpressApp());
		await this._startServerAsync(PORT, HOST);
		Global.logAll(`Server started and listening on http://${HOST}:${PORT}`, { host: HOST, port: PORT, environment: ENV });

		// Graceful shutdown
		process.on('SIGINT', async () => {
			await this.stop();
			process.exit(0);
		});
	}

//==============================================================================================

	async stop() {
		if (!this.server) { return; }

		try {
			// Force close server after SHUTDOWN_TIMEOUTsecs
			// setTimeout(async () => {
			//     console.warn('Forcing server to stop');
			//     // await this.cleanUp();

			//     console.warn('Server forced to stop');
			// }, SHUTDOWN_TIMEOUT);

			// Global.log('Gracefully stopping server');

			await this._stopServerAsync();
			delete this.server;
			// Global.log('Server stopped');

			// await this.cleanUp();
		} catch (error) {
			console.error('Error stopping server:', error);
		}
	}

//==============================================================================================

    async initDB() {
        // open connection to MongoDB
        if (!isConnected()) { process.exit(1); }
    }

//==============================================================================================

	async getExpressApp() {
		// create Express app
		const app = express();
		
        // security basics
		app.disable('x-powered-by');
		
		// cookie parser
		// app.use(cookieParser());

		// decode URI
		// app.use(decodeURL);

		// CORS
		const allowedOrigins = [
			'http://localhost:19006',
			'http://localhost:19001',
		];
		app.use(cors({
			origin: allowedOrigins.join(','),
			credentials: true
		}));

		passport.use(userModel.createStrategy());
  		passport.serializeUser(userModel.serializeUser());
		passport.deserializeUser(userModel.deserializeUser());

		// open connection to MongoDB
		await this.initDB();

		app.use(express.json());
		app.use(express.urlencoded({ extended: false }));
		app.use(session({
			secret: SECRET,
			resave: false,
			saveUninitialized: false,
			cookie: {
				maxAge: 24 * 60 * 60 * 1000,
				secure: false,
				httpOnly: true,
			} // 24 hours
		}));
		app.use(passport.initialize());
		app.use(passport.session());

		// Augmenter la limite de taille de la requête (par exemple, 10 Mo)
		app.use(bodyParser.json({ limit: '10mb' }));
		app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

		// logger
		app.use(accessLoggerMiddleware);

		// schema
		app.use(validatorMiddleware);

		// authentication
		app.use(authenticationMiddleware);

		// authorization
		app.use(authorizationMiddleware);

		// // router
		app.use(router);

		return app;
	}

//==============================================================================================

	_startServerAsync(port, host) {
		return new Promise((resolve, reject) => {
			this.server.listen(port, host, () => { resolve(); });
		});
	}

	_stopServerAsync() {
		return new Promise((resolve, reject) => {
			this.server.close(() => { resolve() });
		});
	}
}
