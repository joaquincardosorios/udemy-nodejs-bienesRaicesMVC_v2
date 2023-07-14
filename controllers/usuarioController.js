import {check, validationResult} from 'express-validator'
import Usuario from "../model/Usuario.js"
import { generarId } from '../helpers/token.js'
import { emailRegistro } from '../helpers/emails.js'


const formularioLogin = (req,res) => {
    res.render('auth/login',{
        pagina: 'Iniciar Sesion'
    })
}

const formularioRegistro = (req,res) => {
    res.render('auth/registro',{
        pagina: 'Crear Cuenta',
        csrfToken : req.csrfToken()
    })
}

const registrar = async (req,res) => {
    const { nombre, email, password } = req.body
    // Validacion
    await check('nombre').notEmpty().withMessage('El nombre es obligatorio').run(req)
    await check('email').isEmail().withMessage('Eso no parece un email').run(req)
    await check('password').isLength({min:6}).withMessage('El password debe ser de al menos 6 caracteres').run(req)
    await check('repetir_password').equals(password).withMessage('Los passwords no son iguales').run(req)
    let resultado = validationResult(req)

    // Verificar que el resulte esté vacio
    if(!resultado.isEmpty()){
        return res.render('auth/registro',{
            pagina: 'Crear Cuenta',
            csrfToken : req.csrfToken(),
            errores: resultado.array(),
            usuario: {
                nombre,
                email
            }
        })
    }

    // Verificar que el usuario no este duplicado
    const existeUsuario = await Usuario.findOne({where : {email}})
    console.log(existeUsuario)
    if(existeUsuario){
        return res.render('auth/registro',{
            pagina: 'Crear Cuenta',
            csrfToken : req.csrfToken(),
            errores: [{msg: "El email ya esta registrado"}],
            usuario: {
                nombre: nombre,
                email: email
            }
        })
    }

    // Almacenar un Usuario
    const usuario = await Usuario.create({
        nombre, 
        email, 
        password, 
        token: generarId()
    })

    emailRegistro({
        nombre: usuario.nombre,
        email: usuario.email,
        token: usuario.token
    })

    res.render('templates/mensaje',{
        pagina: 'Cuenta creada correctamente',
        mensaje: 'Hemos enviado un email de confirmacion, por favor verifica tu cuenta'
    })


    
}

// Funcion que comprueba una cuenta
const confirmar = async (req,res) => {
    const { token } = req.params
    // Verificar si el token es valido
    const usuario = await Usuario.findOne({where: {token}})
    console.log(usuario)
    if(!usuario){
        return res.render('auth/confirmar-cuenta', {
            pagina: 'Error al confimar tu cuenta',
            mensaje: 'Hubo un error al confirmar tu cuenta, intenta de nuevo',
            error: true
        })
    }

    //Confirmar la cuenta
    usuario.token = null;
    usuario.confirmado = true;
    await usuario.save();

    res.render('auth/confirmar-cuenta', {
        pagina: 'Cuenta Confirmada',
        mensaje: 'La cuenta se confirmo correctamente',
    })

    
}

const formularioOlvidePassword = (req,res) => {
    res.render('auth/olvide-password',{
        pagina: 'Recupera tu Acceso a Bienes Raices'
    })
}

export {
    formularioLogin,
    formularioRegistro,
    registrar,
    confirmar,
    formularioOlvidePassword
}