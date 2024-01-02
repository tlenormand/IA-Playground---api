'use strict';

// import * as logging from 'utils/logging';
import http from 'http';
import https from 'https';
import express from 'express';
import cors from 'cors';
// import decodeURL from './middlewares/decodeURI.middleware.mjs';
import fs from 'fs';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { ENV } from './config/env.mjs';
import passport from 'passport';
import ErrorHandler from './middlewares/errors/errorHandler.middleware.mjs';
import SuccessHandler from './middlewares/success/successHandler.middleware.mjs';
import session from 'express-session';
import LocalStrategy from 'passport-local';
import cookieSession from 'cookie-session';
import { userSchema, userModel } from './api/users/User.schema.mjs';
// import { PORT, SHUTDOWN_TIMEOUT } from 'config/server';
import { CORS_WHITELIST } from './config/cors.mjs';
import jwt from 'jsonwebtoken';
import './globals/console.mjs';

import { isConnected } from './db/AbstractDB.mjs';
// import Session from 'api/suite/users/db/Session';
// import PasswordChangeRequest from 'api/suite/users/db/PasswordChangeRequest';
// import Place from 'api/shared/places/db/Place';

// init routing
import router from './routes/index.mjs';
// import corsMiddleware from './middlewares/cors.mjs';
import { log } from 'console';
const PORT = 3000;
const HOST = '127.0.0.1';  // host for local dev
const SECRET = 'secret';
// const HOST = '0.0.0.0';  // host for docker container
const SHUTDOWN_TIMEOUT = 5000;
// const options = {
// 	key: fs.readFileSync('/mnt/c/Users/lenor/Desktop/shared/perso/apiSample/https/key.pem'),
// 	cert: fs.readFileSync('/mnt/c/Users/lenor/Desktop/shared/perso/apiSample/https/cert.pem')
// };

export default class App {
	async start() {
		_log(`Using environment: ${ENV}`);
		// this.server = https.createServer(options, await this.getExpressApp());
		this.server = http.createServer(await this.getExpressApp());
		await this._startServerAsync(PORT, HOST);
		_log(`Server started and listening on http://${HOST}:${PORT}`, { port: PORT });

		// Graceful shutdown
		process.on('SIGINT', async () => {
			await this.stop();
			process.exit(0);
		});
	}

//==============================================================================================

	async stop() {
		if (!this.server) {
			return;
		}

		// Force close server after 5secs
		setTimeout(async () => {
			console.warn('Forcing server to stop');
			await this.cleanUp();

			console.warn('Server forced to stop');
			process.exit(1);
		}, SHUTDOWN_TIMEOUT);

		_log('Gracefully stopping server');

		await this._stopServerAsync();
		delete this.server;
		console.info('Server stopped');

		await this.cleanUp();
	}

//==============================================================================================

    async initDB() {
        // open connection to MongoDB
        if (!isConnected()) { process.exit(1); }

        // init database
        try {
            // await new Session().init();
            // await new PasswordChangeRequest().init();
            // await new Place().init();
        } catch (err) {
            _log('Error when initializing the DB', err);
            process.exit(1);
        }
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
			// origin: 'http://localhost:19006',
			origin: allowedOrigins.join(','),
			credentials: true
		}));

		passport.use(userModel.createStrategy());
		// passport.use(new LocalStrategy({
		// 	usernameField: 'email',
		// 	passwordField: 'password'
		// }, function(email, password, done) {
		// 	userModel.findOne({ email: email }, function (err, user) {
		// 		if (err) { return done(err); }
		// 		if (!user) { return done(null, false, { message: 'User not found.' }); }
		// 		// TODO: if the password isn't correct
		// 		if (!user.verifyPassword(password)) { return done(null, false, {   
		// 		message: 'Invalid password.' }); }
		// 		return done(null, user);
		// 	});
		// }));

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

		// reponses
		app.use(ErrorHandler);
		app.use(SuccessHandler);

		// router
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
