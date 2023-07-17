import express from 'express'
import { body } from 'express-validator'
import { admin, crear, guardar, agregarImagen, almacenarImagen, editar, guardarCambios } from '../controllers/propiedadesController.js'
import upload from '../middleware/subirImagen.js'

const router = express.Router()

router.get('/mis-propiedades', admin)
router.get('/propiedades/crear',crear)
router.post('/propiedades/crear',
    body('titulo').notEmpty().withMessage('El titulo del anuncio es obligatorio'),
    body('descripcion')
        .notEmpty().withMessage('La Descripcion no puede ir vacia')
        .isLength({ max: 200 }).withMessage('La Descripcion es muy larga'),
    body('categoria').isNumeric().withMessage('Selecciona una categoria'),
    body('precio').isNumeric().withMessage('Selecciona un rango de precios'),
    body('habitaciones').isNumeric().withMessage('Selecciona una cantidad de habitaciones'),
    body('estacionamiento').isNumeric().withMessage('Selecciona la cantidad de estacionamientos'),
    body('wc').isNumeric().withMessage('Selecciona la cantidad de baños'),
    body('lat').notEmpty().withMessage('Ubica la propiedad en el mapa'),
    guardar
)
router.get('/propiedades/agregar-imagen/:id', agregarImagen)
router.post('/propiedades/agregar-imagen/:id', 
    upload.single('imagen'),
    almacenarImagen
)

router.get('/propiedades/editar/:id', editar)
router.post('/propiedades/editar/:id',
    body('titulo').notEmpty().withMessage('El titulo del anuncio es obligatorio'),
    body('descripcion')
        .notEmpty().withMessage('La Descripcion no puede ir vacia')
        .isLength({ max: 200 }).withMessage('La Descripcion es muy larga'),
    body('categoria').isNumeric().withMessage('Selecciona una categoria'),
    body('precio').isNumeric().withMessage('Selecciona un rango de precios'),
    body('habitaciones').isNumeric().withMessage('Selecciona una cantidad de habitaciones'),
    body('estacionamiento').isNumeric().withMessage('Selecciona la cantidad de estacionamientos'),
    body('wc').isNumeric().withMessage('Selecciona la cantidad de baños'),
    body('lat').notEmpty().withMessage('Ubica la propiedad en el mapa'),
    guardarCambios
)

export default router