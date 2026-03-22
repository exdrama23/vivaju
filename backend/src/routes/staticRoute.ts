// * Imports
import express from 'express';
import type { SuccessResponse, ErrorResponse } from '@interfaces/responseEntity'

const router = express.Router();

router.get('/', (_req, res)=>{
    res.status(200).json({ message: 'Bem vindo à API da Vivaju!' } satisfies SuccessResponse);
});

router.use((_req, res)=>{
    res.status(404).json({ error: 'Esta rota não existe!', type: 'VS_NOT_FOUND' } satisfies ErrorResponse);
});

export default router;