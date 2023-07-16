import express from 'express'
import { admin, crear, guardar } from '../controllers/propiedadesController.js'

const router = express.Router()

router.get('/mis-propiedades', admin)
router.route('/propiedades/crear')
    .get(crear)
    .post(guardar)

export default router