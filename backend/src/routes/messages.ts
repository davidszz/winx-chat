import { Router } from 'express';
import { rateLimit } from 'express-rate-limit';

import { MessagesController } from '@controllers/messages';
import { authMiddleware } from '@middlewares/auth';
import APIError from '@utils/errors/api-error';

const messagesController = new MessagesController();

const messageCreateLimiter = rateLimit({
  windowMs: 5 * 1000,
  max: 5,
  handler: (req, res) =>
    res.status(429).json({
      ...APIError.format({
        code: 429,
        message: 'Too Many Requests',
        description: 'You are sending messages too fast.',
      }),
      retryAfter: req.rateLimit.resetTime.getTime() - Date.now() + req.rateLimit.current * 200,
    }),
});

const getMessagesLimiter = rateLimit({
  windowMs: 5 * 1000,
  max: 4,
  handler: (req, res) =>
    res.status(429).json({
      ...APIError.format({
        code: 429,
        message: 'Too Many Requests',
      }),
      retryAfter: req.rateLimit.resetTime.getTime() - Date.now(),
    }),
});

const router = Router();
router.post('/', authMiddleware, messageCreateLimiter, messagesController.createMessage.bind(messagesController));
router.get('/', authMiddleware, getMessagesLimiter, messagesController.getMessages.bind(messagesController));

export default router;
