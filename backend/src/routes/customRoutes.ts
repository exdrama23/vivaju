import { Router } from 'express';
import CustomController from '@controllers/customController';
import { VSAuth } from '@middlewares/VSAuth';

const router = Router();

router.get('/chats-clientes', VSAuth, CustomController.chatsCliente);
router.get('/chats-lojas', VSAuth, CustomController.chatsLoja);

export default router;
