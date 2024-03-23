import { config } from './config.mjs';


const { security } = config;

export const CORS_WHITELIST = security['cors']['whitelist'];
