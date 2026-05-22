import { Router } from 'express';
import ChatController from '@controllers/chatsController';
import { VSAuth, apenasCliente } from '@middlewares/VSAuth';

const router = Router();

router.post('/', VSAuth, apenasCliente, ChatController.createChat);
router.get('/ids', VSAuth, ChatController.listIds);
router.get('/cliente', VSAuth, ChatController.listCliente);
router.get('/loja', VSAuth, ChatController.listLoja);

router.get('/:id/available', VSAuth, ChatController.verifyAvailable);
router.patch('/:id/block', VSAuth, ChatController.block);
router.patch('/:id/disable', VSAuth, ChatController.disable);
router.delete('/:id', VSAuth, ChatController.delete);

export default router;
