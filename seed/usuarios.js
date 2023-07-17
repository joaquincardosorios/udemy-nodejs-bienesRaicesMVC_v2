import bcrypt from 'bcrypt'

const usuarios = [
    {
        nombre: 'Joaquin',
        email: 'juako.r@gmail.com',
        confirmado: 1,
        password: bcrypt.hashSync('Juako90', 10)
    },
    {
        nombre: 'Kiam',
        email: 'miyudanger20@gmail.com',
        confirmado: 1,
        password: bcrypt.hashSync('Kiam90', 10)
    },
]

export default usuarios