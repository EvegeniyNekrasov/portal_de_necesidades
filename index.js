require("dotenv").config();

const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')

const fs = require('fs').promises

const db = require('./db')
const app = express()

const {
isAuthenticated,
serviceExists
} = require('./middleware/middleware')

const {
    createService,
    markAsComplete,
    getServices,
    newTask
} = require('./Repositories/services')

const {
    login
} = require('./controllers/users')

const {
    register
} = require('./controllers/register')

const {
    addComment,
} = require('./controllers/controladores')

const {
    uploadImg
} = require('./controllers/uploadImg')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//middleware para recibir ficheros subidos desde un formulario
//app.use(fileUpload())

//app.use(express.static('public'));


/*const corsOptions = {
    origin: '',
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions))

app.use((req, res, next) => {
    console.log(`[${new Date()}] ${req.method}  ${req.url}`)
    next()
})*/

//USUARIO ANONIMO
// Solicitamos la lista de servicios disponibles
app.get('/service/list', getServices)

// Hacemos login
app.post('/login', login)

// Registramos en la aplicacion
app.post('/register', register)

// USUARIOS REGISTRADOS
// Añado servicios a la base de datos, comprobando si el usuario esta autenticado.
app.post('/service/add', isAuthenticated, createService, newTask)

app.post('/service/newtask', isAuthenticated, newTask)

// Añado comentarios y subo archivo con trabajo requerido.
app.patch('/service/:id', serviceExists, isAuthenticated, addComment)

app.put('/service/:id/files', isAuthenticated, serviceExists)

// Marcar servicio como resuelto
app.post('/services/:id', isAuthenticated, serviceExists, markAsComplete)

// Saludo de bienvenida carpeta Raíz
app.get('/', (req, res) => {
    res.send("<h1>Hola, Bienvenid@ a nuestro Proyecto, Portal de necesidades.</h1>")
});

// Servidor localhost:SERVER_PORT
app.listen(process.env.SERVER_PORT, () => {
    console.log(`Listening on port ${process.env.SERVER_PORT}`)
});
