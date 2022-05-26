import { Router } from 'express';
import { MessagesController } from '@controllers/messages';
import { authMiddleware } from '@middlewares/auth';

const messagesController = new MessagesController();

const router = Router();
router.post('/', authMiddleware, messagesController.createMessage.bind(messagesController));

export default router;
