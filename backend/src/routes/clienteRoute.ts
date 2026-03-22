import express, { type RequestHandler } from 'express';
import { apenasCliente, VSAuth } from '@middlewares/VSAuth';
import ClienteController from '@controllers/clienteController';

const router = express.Router();

router.post('/cliente', ClienteController.cadastroCliente as RequestHandler);
router.put('/cliente', VSAuth, apenasCliente, ClienteController.editarCliente as RequestHandler);
router.get('/cliente/id/:id', ClienteController.buscarClientePorId as RequestHandler);

export default router;