import express from "express";
import { 
    formularioLogin, 
    autenticar,
    formularioRegistro, 
    registrar, 
    confirmar, 
    formularioOlvidePassword, 
    resetPassword, 
    comprobarToken,
    nuevoPassword 
} from "../controllers/usuarioController.js";

const router = express.Router();


router.route('/login')
    .get(formularioLogin)
    .post(autenticar)

router.route('/registro')
    .get(formularioRegistro)
    .post(registrar);

router.get('/confirmar/:token', confirmar)

router.route('/olvide-password')
    .get(formularioOlvidePassword)
    .post(resetPassword);

// Almacena el nuevo password
router.route('/olvide-password/:token')
    .get(comprobarToken)
    .post(nuevoPassword)


export default router