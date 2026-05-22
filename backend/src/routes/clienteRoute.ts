import express, { type RequestHandler } from 'express';
import { apenasCliente, VSAuth } from '@middlewares/VSAuth';
import ClienteController from '@controllers/clienteController';

const router = express.Router();

router.post('/', ClienteController.cadastroCliente as RequestHandler);
router.put('/', VSAuth, apenasCliente, ClienteController.editarCliente as RequestHandler);
router.get('/id/:id', ClienteController.buscarClientePorId as RequestHandler);

export default router;