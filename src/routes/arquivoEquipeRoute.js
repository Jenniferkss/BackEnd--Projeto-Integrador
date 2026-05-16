import express from 'express';
import * as controller from '../controllers/arquivoControllerequipe.js';
import autenticarApikey from '../lib/middlewares/apiKey.js';
import { upload } from '../lib/middlewares/fileGate.js';

const router = express.Router();

router.post('/:id', autenticarApikey, upload.single('foto'), controller.uploadFoto);
router.get('/:id', autenticarApikey, controller.buscarFoto);
router.delete('/:id', autenticarApikey, controller.deletarFoto);

router.post('/foto/:id', autenticarApikey, upload.single('arquivo'), controller.uploadFoto);
router.get('/foto/:id', autenticarApikey, controller.buscarFoto);
router.delete('/foto/:id', autenticarApikey, controller.deletarFoto);

router.post('/documento/:id', autenticarApikey, upload.single('arquivo'), controller.uploadDocumento);
router.get('/documento/:id', autenticarApikey, controller.buscarDocumento);
router.delete('/documento/:id', autenticarApikey, controller.deletarDocumento);

export default router;