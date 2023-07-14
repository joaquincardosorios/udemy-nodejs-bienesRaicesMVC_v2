import express from 'express'
import csrf  from 'csurf'
import cookieParser from 'cookie-parser'
import usuarioRoutes from './routes/usuarioRoutes.js'
import db from './config/db.js';


const app = express(); // Crear la app
app.use(express.urlencoded({extended: true})) // Habilitar lectura de datos de formularios
app.use(cookieParser()) // Habilitar Cookie Parser
let csrfProtection = csrf({cookie: true}) // Habilitar CSRF

// Conexion a la base de datos
try {
    await db.authenticate();
    db.sync();
    console.log('Conexion correcta a la base de datos')
} catch (error) {
    console.log(error)
}

app.set('view engine', 'pug') // Habilitar PUG
app.set('views', './views')
app.use(express.static('public')) // Carpeta publica
app.use('/auth',csrfProtection, usuarioRoutes) // Routing

// Definir puerto y arrancar proyecto
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`)
})