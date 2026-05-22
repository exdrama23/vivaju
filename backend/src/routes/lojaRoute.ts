import { Router } from 'express';
import LojaController from '@controllers/lojaController';
import { VSAuth } from '@middlewares/VSAuth';

const router = Router();

router.post('/', LojaController.cadastroLoja);
router.get('/', LojaController.buscarLojas);
router.get('/estacionamento', LojaController.buscarEstacionamentos);
router.get('/:id', LojaController.buscarLojaPorId);
router.get('/nome/:nome', LojaController.buscarLojasPorNome);
router.get('/categoria/:categoria', LojaController.buscarLojasPorCategoria);
router.get('/produto/:produto', LojaController.buscarLojasPorProduto);

router.patch('/', VSAuth, LojaController.editarLoja);

export default router;
