import PontoTuristicoController from '@controllers/pontoTuristicoController';
import express, { type RequestHandler } from 'express';

const router = express.Router();

router.get('/pontoturistico', PontoTuristicoController.buscarPontosTuristicos as RequestHandler);
// router.put('/cliente', VSAuth, apenasCliente, ClienteController.editarCliente as RequestHandler);

export default router;