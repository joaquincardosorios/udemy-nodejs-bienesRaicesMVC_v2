import { Propiedad, Precio, Categoria } from '../model/index.js'

const propiedades = async (req,res) => {
    const propiedades = await Propiedad.findAll({
        where:{
            publicado: true
        },
        include:[
            {model: Precio, as:'precio'},
            {model: Categoria, as:'categoria'}
        ]
    })
    res.json(propiedades)
}

export {
    propiedades
}