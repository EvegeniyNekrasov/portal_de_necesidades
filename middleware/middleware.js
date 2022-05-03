require("dotenv").config();

const jwt = require("jsonwebtoken");

const db = require('../db')

const isAuthenticated = async (req, res, next) => {
    const token = req.headers.authorization
    const connection = await db.getConnection()
    try {
        const userInfo = jwt.verify(token, process.env.SECRET)
        req.appInfo = {
            id: userInfo.id
        }
        
        // Comprobar que el usuario está en una sessión activa
        const sqlGetUser = `select * from users where id="${userInfo.id}" and insession=true`

        const users = await connection.query(sqlGetUser)
        
        // compruebo si está en la bbdd ese usuario
        if (users[0][0].length === 0) {
            res.sendStatus(403)
            connection.release()
            return
        }
        

        next()
    } catch {
        console.log('[ERROR] verificando token')
        res.sendStatus(401)
    }
}

const serviceExists = async (req, res, next) => {
    const connection = await db.getConnection()
    const idService = req.params.id
    const sqlGetService = `select * from services where id=${idService}`
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