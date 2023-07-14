import express from 'express'
import usuarioRoutes from './routes/usuarioRoutes.js'
import db from './config/db.js';

// Crear la app
const app = express();

// Conexion a la base de datos
try {
    await db.authenticate();
    console.log('Conexion correcta a la base de datos')
} catch (error) {
    console.log(error)
}

// Habilitar PUG
app.set('view engine', 'pug')
app.set('views', './views')

// Carpeta publica
app.use(express.static('public'))

// Routing
app.use('/auth', usuarioRoutes)

// Definir puerto y arrancar proyecto
const port = 3000;
app.listen(port, () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`)
})