import Propiedad from "./Propiedad.js";
import Precio from "./Precio.js";
import Categoria from "./Categoria.js";
import Usuario from "./Usuario.js";
import Mensaje from "./Mensaje.js";


// Precio.hasOne(Propiedad)
// Categoria.hasOne(Propiedad)
// Usuario.hasMany(Propiedad)

Propiedad.belongsTo(Precio, {foreignKey: 'precioId', onDelete:'CASCADE'})
Propiedad.belongsTo(Categoria, {foreignKey: 'categoriaId', onDelete:'CASCADE'})
Propiedad.belongsTo(Usuario, {foreignKey: 'usuarioId'})

Mensaje.belongsTo(Propiedad, {foreignKey: 'propiedadId'})
Mensaje.belongsTo(Usuario, {foreignKey: 'usuarioId'})


export {
    Propiedad,
    Precio,
    Categoria,
    Usuario,
    Mensaje
}