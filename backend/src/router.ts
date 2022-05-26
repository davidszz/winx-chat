import { Router } from 'express';

import usersRoute from './routes/users';
import authRoute from './routes/auth';
import messagesRoute from './routes/messages';

const router = Router();
router.use('/users', usersRoute);
router.use('/auth', authRoute);
router.use('/messages', messagesRoute);

export default router;
