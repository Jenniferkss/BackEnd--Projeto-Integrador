import express from 'express';
import * as controller from '../controllers/arquivoControllerLivro.js';
import autenticarApikey from '../lib/middlewares/apiKey.js';
import { upload } from '../lib/middlewares/fileGate.js';

const router = express.Router();

router.post('/:id', autenticarApikey, upload.single('foto'), controller.uploadFoto);
router.get('/:id', autenticarApikey, controller.buscarFoto);
router.delete('/:id', autenticarApikey, controller.deletarFoto);

export default router;