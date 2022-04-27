require("dotenv").config()
const db = require('../db')

// Listamos todos los servicios disponibles.
const getServices = async (req, res) => {
    
    const connection = await db.getConnection()
    const sqlGetServices = `select * from services`
    const respuesta = await connection.query(sqlGetServices)
    res.status(200).send(respuesta[0])
}

// Creamos el nuevo servicio, pero antes de poder crearlo, el usuario tiene que estar creado. Por el uso del foreign key userID = id de tabla users
const createService = async (req, res) => {
    try{
        const connection = await db.getConnection()
        const {title, description, file, comments, userId} = req.body
        const sqlCreateService = `insert into services (title, description, file, comments, userId) 
        values ("${title}","${description}", "${file}", "${comments}", ${userId})`
        await connection.query(sqlCreateService)

        const markAsComplete = `insert into completeworks (id_user, id_service) values (${userId}, ${serviceId})`
        res.status(200).send("[EXITO] Servicio creado correctamente")
    } catch (e) {
        res.status(403).send("[ERROR] el servicio no esta creado, rellene los campos necesarios e intentelo de nuevo")
    }

}

const markAsComplete = async (req, res) => {
    const {userId, serviceId} = req.body
    const connection = await db.getConnection()
    let sql = ``

    await connection.query(sql)
}

module.exports = {
    createService,
    getServices,
    markAsComplete
} 