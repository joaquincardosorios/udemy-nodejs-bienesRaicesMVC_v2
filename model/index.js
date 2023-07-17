import Propiedad from "./Propiedad.js";
import Precio from "./Precio.js";
import Categoria from "./Categoria.js";
import Usuario from "./Usuario.js";

// Precio.hasOne(Propiedad)
// Categoria.hasOne(Propiedad)
// Usuario.hasMany(Propiedad)

Propiedad.belongsTo(Precio, {foreignKey: 'precioId', onDelete:'CASCADE'})
Propiedad.belongsTo(Categoria, {foreignKey: 'categoriaId', onDelete:'CASCADE'})
Propiedad.belongsTo(Usuario, {foreignKey: 'usuarioId'})




export {
    Propiedad,
    Precio,
    Categoria,
    Usuario
}