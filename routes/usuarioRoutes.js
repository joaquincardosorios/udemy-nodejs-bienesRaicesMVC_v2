import express from "express";

const router = express.Router();


router.get('/login', (req,res) => {
    res.render('auth/login',{
        autenticado: true
    })
})



// router.route('/')
//     .get((req,res) => {
//             res.send('Hola mundo en express')
//         })
//     .post((req,res) => {
//             res.json({msg: 'Respuesta tipo Post'})
//         })

export default router