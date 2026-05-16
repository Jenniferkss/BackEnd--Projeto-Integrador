import express from 'express';
import * as controller from '../controllers/fotoControllerEquipe.js';
import autenticarApikey from '../lib/middlewares/apiKey.js';
import { upload } from '../lib/helpers/fotoHelper.js';

const router = express.Router();

router.post('/:id', autenticarApikey, upload.single('foto'), controller.uploadFoto);
router.get('/:id', autenticarApikey, controller.verFoto);

export default router;