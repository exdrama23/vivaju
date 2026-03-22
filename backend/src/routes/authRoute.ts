import express, { type RequestHandler } from 'express';
import {  VSAuth } from '@middlewares/VSAuth';
import AuthController from '@controllers/authController';
import RateLimit from '@middlewares/rateLimit';

const router = express.Router();

router.post('/login/loja', RateLimit.login, AuthController.loginLoja as RequestHandler);
router.post('/login/cliente', RateLimit.login, AuthController.loginCliente as RequestHandler);
router.post('/logout', VSAuth, AuthController.logout as RequestHandler);

export default router;