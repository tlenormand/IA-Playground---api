'use strict'

import atariConfig from './atari.config.mjs';
import dockersConfig from './dockers.config.mjs';
import infoConfig from './info.config.mjs';
import loginConfig from './login.config.mjs';
import logoutConfig from './logout.config.mjs';
import logsConfig from './logs.config.mjs';
import modelsConfig from './models.config.mjs';
import registerConfig from './register.config.mjs';
import userConfig from './user.config.mjs';


const config = {
    api: {
        atari: atariConfig,
        dockers: dockersConfig,
        info: infoConfig,
        login: loginConfig,
        logout: logoutConfig,
        logs: logsConfig,
        models: modelsConfig,
        register: registerConfig,
        user: userConfig,
    }
}


export default config;
