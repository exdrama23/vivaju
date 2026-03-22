import ProdutoController from '@controllers/produtoController';
import { apenasLoja, VSAuth } from '@middlewares/VSAuth';
import express, { type RequestHandler } from 'express';

const router = express.Router();

router.post('/produto', VSAuth, apenasLoja, ProdutoController.adicionarProduto as RequestHandler);
// router.put('/cliente', VSAuth, apenasCliente, ClienteController.editarCliente as RequestHandler);

export default router;