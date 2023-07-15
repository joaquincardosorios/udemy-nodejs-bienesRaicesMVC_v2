import Precio from "../model/Precio.js"
import Categoria from "../model/Categoria.js"

const admin = (req,res) => {
    res.render('propiedades/admin', {
        pagina: 'Mis propiedades',
        barra: true
    })
}

// Formulario para crear una nueva propiedad
const crear = async (req,res) => {
    // Consultar modelo de precios y categorias
    const [categorias, precios] = await Promise.all([
        Categoria.findAll(),
        Precio.findAll()
    ])

    res.render('propiedades/crear', {
        pagina: 'Crear Propiedad',
        barra: true,
        categorias,
        precios
    })
}

export{
    admin,
    crear
}