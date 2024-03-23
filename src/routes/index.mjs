import { Router } from 'express';

import atariRoute from './atari.route.mjs';
import dockerRoute from './docker.route.mjs';
import infoRoute from './info.route.mjs';
import loginRoute from './login.route.mjs';
import logoutRoute from './logout.route.mjs';
import logsRoute from './logs.route.mjs';
import modelsRoute from './models.route.mjs';
import registerRoute from './register.route.mjs';
import userRoute from './user.route.mjs';

const router = new Router();

router.use('/api/atari', atariRoute);
router.use('/api/dockers', dockerRoute);
router.use('/api/info', infoRoute);
router.use('/api/login', loginRoute);
router.use('/api/logout', logoutRoute);
router.use('/api/logs', logsRoute);
router.use('/api/models', modelsRoute);
router.use('/api/register', registerRoute);
router.use('/api/user', userRoute);


export default router;
