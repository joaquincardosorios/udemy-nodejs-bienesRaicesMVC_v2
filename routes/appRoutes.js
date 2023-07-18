import express from 'express'
import { inicio, categoria, noEncontrado, buscador } from '../controllers/appController.js'

const router = express.Router()

// Pagina de Inicio
router.get('/', inicio)

// Pagina de Categorias
router.get('/categorias/:id', inicio)

// Pagina 404
router.get('/404', noEncontrado)

// Buscador
router.post('/buscador', buscador)


export default router


