import { Precio, Categoria, Propiedad } from '../model/index.js'


const inicio = async (req,res) => {

    const [ categorias, precios ] = await Promise.all([
        Categoria.findAll(),
        Precio.findAll()
    ])

    res.render('inicio',{
        pagina:'Inicio'
    })
}

const categoria = (req,res) => {

}

const noEncontrado = (req,res) => {

}

const buscador = (req,res) => {

}

export {
    inicio,
    categoria,
    noEncontrado,
    buscador
}