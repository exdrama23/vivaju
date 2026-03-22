import express from 'express';

// * Importing routes
import authRoutes from './authRoute';
import empresaRoute from './lojaRoute';
import clienteRoute from './clienteRoute';
import eventoRoute from './eventoRoute';
import pontoTuristicoRoute from './pontoTuristicoRoute';
import categoriaRoute from './categoriaRoute';
import produtoRoute from './produtoRoute';

import staticRoute from './staticRoute';

const router = express.Router();

router.use(authRoutes);
router.use(empresaRoute);
router.use(clienteRoute);
router.use(eventoRoute);
router.use(pontoTuristicoRoute);
router.use(categoriaRoute);
router.use(produtoRoute);

// * Sempre por último, para evitar que as rotas sejam sobrescritas
router.use(staticRoute);

export default router;