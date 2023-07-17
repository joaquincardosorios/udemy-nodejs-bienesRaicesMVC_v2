import bcrypt from 'bcrypt'

const usuarios = [
    {
        nombre: 'Joaquin',
        email: 'juako.r@gmail.com',
        confirmado: 1,
        password: bcrypt.hashSync('Juako90', 10)
    }
]

export default usuarios