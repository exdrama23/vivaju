import express, { type RequestHandler } from 'express';
import EventoController from '@controllers/eventoController';

const router = express.Router();

router.get('/evento', EventoController.buscarEventos as RequestHandler);
// router.put('/cliente', VSAuth, apenasCliente, ClienteController.editarCliente as RequestHandler);

export default router;