import express from "express";

const router = express.Router();


// router.get('/', function(req,res){
//     res.send('Hola mundo en express')
// })

// router.post('/informacion', function(req,res){
//     res.json({msg: 'Respuesta tipo Post'})
// })

router.route('/')
    .get((req,res) => {
            res.send('Hola mundo en express')
        })
    .post((req,res) => {
            res.json({msg: 'Respuesta tipo Post'})
        })
export default router