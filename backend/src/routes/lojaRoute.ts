import express, { type RequestHandler } from 'express';
import { apenasLoja, VSAuth } from '@middlewares/VSAuth';
import LojaController from '@controllers/lojaController';

const router = express.Router();

router.post('/loja', LojaController.cadastroLoja as RequestHandler);
router.put('/loja', VSAuth, apenasLoja, LojaController.editarLoja as RequestHandler);
router.get('/loja', LojaController.buscarLojas as RequestHandler);
router.get('/loja/nome/:nome', LojaController.buscarLojasPorNome as RequestHandler);
router.get('/loja/categoria/:categoria', LojaController.buscarLojasPorCategoria as RequestHandler);
router.get('/loja/produto/:produto', LojaController.buscarLojasPorProduto as RequestHandler);
router.get('/loja/id/:id', LojaController.buscarLojaPorId as RequestHandler);
router.get('/loja/estacionamento', LojaController.buscarEstacionamentos as RequestHandler);

export default router;