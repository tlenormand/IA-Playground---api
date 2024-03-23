import { ENV } from './env.mjs';


export const config = {
    port: 3000,
    shutdownTimeout: 5000,
    mongodb: {
        url: 'mongodb://127.0.0.1:27017',
        db: ENV === 'test' ? 'test' : 'appSample',
        ssl: false,
        username: '',
        password: ''
    },
    security: {
        cors: {
            whitelist: []
        }
    }
};
