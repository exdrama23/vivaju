import CategoriaController from '@controllers/categoriaController';
import { apenasLoja, VSAuth } from '@middlewares/VSAuth';
import express, { type RequestHandler } from 'express';

const router = express.Router();

router.post('/categoria', VSAuth, apenasLoja, CategoriaController.adicionarCategoria as RequestHandler);
// router.put('/cliente', VSAuth, apenasCliente, ClienteController.editarCliente as RequestHandler);

export default router;