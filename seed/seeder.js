import { exit } from 'node:process'
import categorias from "./categorias.js";
import precios from "./precios.js";
import usuarios from "./usuarios.js";
import db from '../config/db.js'
import {Categoria, Precio, Usuario} from '../model/index.js'

const importarDatos = async () => {
    try {
        // Autenticar
        await db.authenticate()

        // Genera las columnas
        await db.sync()

        //Insertamos los datos
        await Promise.all([
            Categoria.bulkCreate(categorias),
            Precio.bulkCreate(precios),
            Usuario.bulkCreate(usuarios)
        ])

        console.log('Datos importados correctamente')
        exit(0) // Cero porque el proceso termino correctamente
        
    } catch (error) {
        console.log(error)
        exit(1)
    }
}

const eliminarDatos = async() => {
    try {

        // await Promise.all([
        //     Categoria.destroy({where:{}, truncate:true}),
        //     Precio.destroy({where:{}, truncate:true})
        // ])

        await db.sync({force: true}) // Segunda forma

        console.log('Datos eliminados correctamente')
        exit(0)
    } catch (error) {
        console.log(error)
        exit(1)
    }
}

if(process.argv[2] === "-i"){
    importarDatos();
}

if(process.argv[2] === "-e"){
    eliminarDatos();
}