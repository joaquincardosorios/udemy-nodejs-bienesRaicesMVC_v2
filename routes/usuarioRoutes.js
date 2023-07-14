import express from "express";
import { formularioLogin, formularioRegistro, registrar, formularioOlvidePassword } from "../controllers/usuarioController.js";

const router = express.Router();


router.get('/login', formularioLogin)
router.route('/registro')
    .get(formularioRegistro)
    .post(registrar)
router.get('/olvide-password',formularioOlvidePassword)



// router.route('/')
//     .get((req,res) => {
//             res.send('Hola mundo en express')
//         })
//     .post((req,res) => {
//             res.json({msg: 'Respuesta tipo Post'})
//         })

export default router