require("dotenv").config();

const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const db = require('../db')

const isAuthenticated = async (req, res, next) => {
try{
const { username, password } = req.body
// Comprobamos que introducen los datos solicitados.
if (!username || !password) {
    res.status(400).send("[ERROR] Faltan el usuario o la centraseña")
    return
}
// Comprobamos si el usuario existe en la DB.
const connection = await db.getConnection()

const sqlGetUser = `select * from users where username="${username}"`

const users = await connection.query(sqlGetUser)

if (users[0].length === 0) {
    res.status(403).send("[ERROR] Usuario no encontrado")
    connection.release()
    return
}
// comprobar que la password es correcta
const passwordsAreEqual = await bcrypt.compare(password, users[0][0].password)

if (!passwordsAreEqual) {
    res.status(403).send("[ERROR] Credenciales incorrectas")
    connection.release()
    return
} 

// Comprobar que el apartado insession es true
const insessionTrue = `select insession from users where username='${username}' and insession= true`
const user = await connection.query(insessionTrue)
const isTrue = user[0][0].insession

    res.sendStatus(200)
    next()
    
} catch(e){
    res.status(403).send("[ERROR] No esta autenticado. Por favor inicie sesion")
    
}

}

const serviceExists = async (req, res, next) => {
    const connection = await db.getConnection()

    const sqlGetService = `select * from services`
    const service = await connection.query(sqlGetService)
    
    if (service[0][0] === undefined) {
        res.status(404).send("Servicio no encontrado o inexistente")
        connection.release()
        return
    }

    connection.release()
    next()
}

module.exports = {
    isAuthenticated,
    serviceExists
}