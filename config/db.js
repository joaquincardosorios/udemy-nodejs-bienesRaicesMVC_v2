import Sequelize from 'sequelize'

const db = new Sequelize('proyectoBienesRaices','root','alohomora',{
    host: '192.168.1.114',
    port:3306,
    dialect: 'mysql',
    define:{
        timestamps: true
    },
    pool:{
        max: 5,
        min: 0,
        acquire: 30000,
        idle:10000
    },
    operatorAliases: false
})

export default db