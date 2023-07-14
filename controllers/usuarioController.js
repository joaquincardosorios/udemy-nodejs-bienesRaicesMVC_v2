import {check, validationResult} from 'express-validator'
import Usuario from "../model/Usuario.js"
import { generarId } from '../helpers/token.js'


const formularioLogin = (req,res) => {
    res.render('auth/login',{
        pagina: 'Iniciar Sesion'
    })
}

const formularioRegistro = (req,res) => {
    res.render('auth/registro',{
        pagina: 'Crear Cuenta'
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
            errores: [{msg: "El email ya esta registrado"}],
            usuario: {
                nombre: nombre,
                email: email
            }
        })
    }

    // Almacenar un Usuario
    await Usuario.create({
        nombre, 
        email, 
        password, 
        token: generarId()
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
    formularioOlvidePassword
}