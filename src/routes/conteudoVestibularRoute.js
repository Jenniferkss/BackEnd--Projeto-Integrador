import express from 'express'
import * as controller from '../controllers/conteudoVestibularController.js'
import autenticarApikey from '../lib/middlewares/apiKey.js'

const router = express.Router()

router.post('/', autenticarApikey, controller.criar)

// Rota principal (usada pelo frontend)
router.get('/', autenticarApikey, controller.buscarPorLivro)

// Rota para listar todos (opcional, mas útil)
router.get('/todos', autenticarApikey, controller.buscarTodos)

router.get('/:id', autenticarApikey, controller.buscarPorId)
router.put('/:id', autenticarApikey, controller.atualizar)
router.delete('/:id', autenticarApikey, controller.deletar)

export default router
