import {check, validationResult} from 'express-validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Usuario from "../model/Usuario.js"
import { generarId, generarJWT } from '../helpers/token.js'
import { emailRegistro, emailOlvidePassword } from '../helpers/emails.js'


const formularioLogin = (req,res) => {
    res.render('auth/login',{
        pagina: 'Iniciar Sesion',
        csrfToken : req.csrfToken()
    })
}

const autenticar = async (req,res) => {
    await check('email').isEmail().withMessage('El email es obligatorio').run(req)
    await check('password').notEmpty().withMessage('El password es obligatorio').run(req)

    let resultado = validationResult(req)
    
    if(!resultado.isEmpty()){
        return res.render('auth/login',{
            pagina: 'Iniciar Sesion',
            csrfToken : req.csrfToken(),
            errores: resultado.array(),
        })
    }
    
    const { email, password } = req.body
    // Comprobar si usuario existe
    const usuario = await Usuario.findOne({where:{email}})
    if(!usuario){
        return res.render('auth/login',{
            pagina: 'Iniciar Sesion',
            csrfToken : req.csrfToken(),
            errores: [{msg: 'El usuario no existe'}],
        })
    }

    // Comprobar si el usuario esta confirmado
    if(!usuario.confirmado){
        return res.render('auth/login',{
            pagina: 'Iniciar Sesion',
            csrfToken : req.csrfToken(),
            errores: [{msg: 'Tu cuenta no ha sido confirmada'}],
        })
    }

    // Comprobar password
    if(!usuario.verificarPassword(password)){
        return res.render('auth/login',{
            pagina: 'Iniciar Sesion',
            csrfToken : req.csrfToken(),
            errores: [{msg: 'El password es incorrecto'}],
        })
    }

    // Autentica usuario
    const token = generarJWT({id: usuario.id, nombre:usuario.nombre})
    

    // Almacenar en un cookie
    return res.cookie('_token', token,{
        httpOnly:true,
        // secure: true
    }).redirect('/mis-propiedades')


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

    // Verificar que resultado esté vacio
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
        pagina: 'Recupera tu Acceso a Bienes Raices',
        csrfToken : req.csrfToken()
    })
}

const resetPassword = async (req,res) => {
    const { email } = req.body
    // Validacion
    await check('email').isEmail().withMessage('Eso no parece un email').run(req)
    let resultado = validationResult(req)

    // Verificar que el resulte esté vacio
    if(!resultado.isEmpty()){
        return res.render('auth/olvide-password',{
            pagina: 'Recupera tu Acceso a Bienes Raices',
            csrfToken : req.csrfToken(),
            errores: resultado.array()
        })
    }

    // Verificar que el usuario no este duplicado
    const usuario = await Usuario.findOne({where : {email}})
    if(!usuario){
        return res.render('auth/olvide-password',{
            pagina: 'Recupera tu Acceso a Bienes Raices',
            csrfToken : req.csrfToken(),
            errores: [{msg: "El email no figura en la base de datos"}],
        })
    }

    // Generar token
    usuario.token = generarId()
    await usuario.save();

    // Enviar Email
    emailOlvidePassword({
        nombre: usuario.nombre,
        email: usuario.email,
        token: usuario.token
    })

    // Mensaje de confirmacion
    res.render('templates/mensaje',{
        pagina: 'Reestablece tu password',
        mensaje: 'Hemos enviado un email con las instrucciones'
    })
}

const comprobarToken = async(req,res) => {
    const { token } = req.params

    const usuario = await Usuario.findOne({where : {token}})
    if(!usuario){
        return res.render('auth/confirmar-cuenta',{
            pagina: 'Reestablece tu password',
            csrfToken : req.csrfToken(),
            mensaje: "Hubo un error al validar tu información. Por favor intenta de nuevo",
            error: true
        })
    }

    // Mostrar formulario de modificacion de password
    res.render('auth/reset-password', {
        pagina: 'Reestablece tu password',
        csrfToken : req.csrfToken()
    })
}

const nuevoPassword = async (req,res) => {
    // Validar password
    await check('password').isLength({min:6}).withMessage('El password debe ser de al menos 6 caracteres').run(req)
    let resultado = validationResult(req)

    // Verificar que resultado esté vacio
    if(!resultado.isEmpty()){
        return res.render('auth/reset-password',{
            pagina: 'Reestablece tu password',
            csrfToken : req.csrfToken(),
            errores: resultado.array(),
        })
    }

    // Identificar quien hace el cambio
    const { token } = req.params
    const { password } = req.body
    
    // Verificar si el token es valido
    const usuario = await Usuario.findOne({where: {token}})


    // Hashear el nuevo password
    const salt = await bcrypt.genSalt(10)
    usuario.password = await bcrypt.hash( password, salt)
    usuario.token = null

    await usuario.save();

    res.render('auth/confirmar-cuenta',{
        pagina: 'Password reestablecido',
        csrfToken : req.csrfToken(),
        mensaje: "El password se guardo correctamente",
    })
}

export {
    formularioLogin,
    autenticar,
    formularioRegistro,
    registrar,
    confirmar,
    formularioOlvidePassword,
    resetPassword,
    comprobarToken,
    nuevoPassword
}