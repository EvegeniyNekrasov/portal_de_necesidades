require("dotenv").config();

const bodyParser = require('body-parser')
const express = require('express')
const fileUpload = require('express-fileupload');
const cors = require('cors')
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

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileUpload());
app.use(cors())


app.get('/service/list', getServices)

// Hacemos login
app.post('/login', login)

// Registramos en la aplicacion
app.post('/register', register)

// USUARIOS REGISTRADOS
// Añado servicios a la base de datos, comprobando si el usuario esta autenticado.
app.post('/service/add', isAuthenticated, createService)

app.post('/service/newtask', isAuthenticated, newTask)

app.post('/uploadImage', uploadImg)

// Añado comentarios y subo archivo con trabajo requerido.
app.patch('/service/:id', serviceExists, isAuthenticated, addComment)

//app.put('/service/:id/files', isAuthenticated, serviceExists, uploadFile)

// Marcar servicio como resuelto
app.post('/services/:id', isAuthenticated, serviceExists, markAsComplete)

// Servidor localhost:SERVER_PORT
app.listen(process.env.SERVER_PORT, () => {
    console.log(`Listening on port ${process.env.SERVER_PORT}`)
});
