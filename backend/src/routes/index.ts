import express from 'express';

// * Importing routes
import authRoutes from './authRoute';
import lojaRoute from './lojaRoute';
import chatRoute from './chatRoute';
import clienteRoute from './clienteRoute';
import eventoRoute from './eventoRoute';
import pontoTuristicoRoute from './pontoTuristicoRoute';
import categoriaRoute from './categoriaRoute';
import produtoRoute from './produtoRoute';
import customRoutes from './customRoutes';
import messageRoute from './messageRoute';

import staticRoute from './staticRoute';

const router = express.Router();

router.use(authRoutes);
router.use('/loja', lojaRoute);
router.use('/chat', chatRoute);
router.use('/cliente', clienteRoute);
router.use('/evento', eventoRoute);
router.use('/ponto-turistico', pontoTuristicoRoute);
router.use('/categoria', categoriaRoute);
router.use('/produto', produtoRoute);
router.use('/custom', customRoutes);
router.use('/message', messageRoute);

// * Sempre por último, para evitar que as rotas sejam sobrescritas
router.use(staticRoute);

export default router;
