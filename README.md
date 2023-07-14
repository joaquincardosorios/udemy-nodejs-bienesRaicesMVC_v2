Pasos proyecto MVC

1. Crear dependencias basicas: 
    npm i express
    npm i -D nodemon // Para desarrollo
    npm i pug
    npm i -D tailwindcss autoprefixer postcss postcss-cli // Tailwind
    npm i sequelize mysql2
    npm i dotenv
    npm i express-validator
    npm i bcrypt
2. Generar Modificar package.json
    "scripts": {
        "start" : "node index.js",
        "dev" : "nodemon index.js"
    }
3. Configurar Tailwind
    -Instalar dependencias
    -En carpeta public/css crear un archivo llamado tailwind.css (ver contenido en la carpeta)
    -Ejecutar en terminal: npx tailwindcss init -p
    -En la carpeta tailwind.config.js ubicar carpeta de contenido css en content ('./views/**/*.pug')
    -Generar el siguiente script en package.json: "css": "postcss public/css/tailwind.css -o public/css/app.css"
    -Ejecutar npm run css
