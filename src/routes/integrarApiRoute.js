import { Router } from 'express';
import { obterBibliotecaCompleta } from '../controllers/integrarApiController.js';

const router = Router();

router.get('/biblioteca', obterBibliotecaCompleta);
router.get('/teste-integracao', obterBibliotecaCompleta);

export default router;
