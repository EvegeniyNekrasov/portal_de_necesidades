require("dotenv").config();

const jwt = require("jsonwebtoken");

const {
    getServices
} = require('../Repositories/services')

const db = require('../DB/db')

const isAuthenticated = async (req, res, next) => {
    const token = req.headers.authorization

    try {
        const userInfo = jwt.verify(token, process.env.SECRET)
        req.appInfo = {
            id: userInfo.id
        }

        const sqlGetUser = `select * from users where id="${userInfo.id}" and insession=true`

        const users = await connection.query(sqlGetUser)

        // compruebo si está en la bbdd ese usuario
        if (users[0].length === 0) {
            res.sendStatus(403)
            connection.release()
            return
        }

        next()
    } catch {
        console.log('Error verificando token')
        res.sendStatus(401)
    }
}

const serviceExists = async (req, res, next) => {
    const connection = await db.getConnection()

    const service = await getServices(req.params.id, connection)

    if (service === undefined) {
        res.sendStatus(404)
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