require("dotenv").config();

const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload');
const express = require('express')
const cors = require('cors')

const fs = require('fs').promises

const db = require('./DB/db')
const app = express()

const {
isAuthenticated,
serviceExists
} = require('./middleware/middleware')

const {
    createService,
    markAsComplete,
    getServices
} = require('./Repositories/services')

const {
    userExists
} = require('./Repositories/users')

const {
    login
} = require('./controllers/users')

const {
    register
} = require('./controllers/register')

/*
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
*/
/* middleware para recibir ficheros subidos desde un formulario
app.use(fileUpload())

app.use(express.static('public'));
*/

const corsOptions = {
    origin: '',
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions))

app.use((req, res, next) => {
    console.log(`[${new Date()}] ${req.method}  ${req.url}`)
    next()
})

//USUARIO ANONIMO
// Solicitamos la lista de servicios disponibles
app.get('/service', listService)

// Hacemos login
app.post('/login', login)

// Registramos en la aplicacion
app.post('/register', userExists, register)

// USUARIOS REGISTRADOS
// Añado servicios a la base de datos, comprobando si el usuario esta autenticado.
app.post('/service', isAuthenticated, addService)

// Añado comentarios y subo archivo con trabajo requerido.
app.patch('/service/:id', isAuthenticated, serviceExists, addComment)

app.put('/service/:id/files', isAuthenticated, serviceExists, uploadFile)

// Marcar servicio como resuelto
app.post('/services/:id', isAuthenticated, serviceExists, markAsComplete)


// devuelvo una lista con información resumida de cada producto
app.get('/service', listProducts)


 // endpoint de ejemplo para subir ficheros
 const processFileUpload = async (req, res) => {

    console.log(req.files.sampleFile.size)

    await fs.writeFile(`mifichero.png`, req.files.sampleFile.data)

    res.send('Fichero subido!!!!')
 }

 app.post('/fileUpload', processFileUpload)


app.listen(process.env.SERVER_PORT)
