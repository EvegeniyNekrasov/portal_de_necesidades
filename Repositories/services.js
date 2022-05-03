require("dotenv").config()
const db = require('../db')

// Listamos todos los servicios disponibles.
const getServices = async (req, res) => {
    
    const connection = await db.getConnection()
    const sqlGetServices = `select * from services`
    const respuesta = await connection.query(sqlGetServices)
    if(respuesta[0][0] === undefined){
        res.send("No hay servicios disponibles")
    } else {
        res.status(200).send(respuesta[0])
    }
}

// Creamos el nuevo servicio.
const createService = async (req, res) => {

        const connection = await db.getConnection()
        const {title, description} = req.body
        
        if(!title || !description){
            res.status(403).send("[ERROR] el servicio no esta creado, rellene los campos necesarios e intentelo de nuevo")
            return
        }
    // Extraemos el id del usuario que crea el servicio.
        const userId = req.appInfo.id
    
    // Insertamos en DB los servicios creados por el usuario.
        const sqlCreateService = `insert into services (title, description, userId) 
        values ("${title}","${description}", ${userId})`
        await connection.query(sqlCreateService)
        res.status(200).send("[EXITO] Servicio creado correctamente")
        connection.release()
}

const markAsComplete = async (req, res) => {
    const connection = await db.getConnection()
    const idService = req.params.id
    let sql = `UPDATE completework set complete=true where id_service=${idService}`
    await connection.query(sql)
    res.status(200).send("[EXITO] Servicio completado !!")
}

const newTask = async (req, res) => {
    
     const connection = await db.getConnection()
     const {username} = req.body
     const serviceId = req.params.id 
     const getUsername = `select id from users where username='${username}'`
     const userId = await connection.query(getUsername)    
     const sqlInsertTask = `INSERT INTO completework (id_user, id_service) values (${userId[0][0].id}, ${serviceId})`
     await connection.query(sqlInsertTask)
 
     res.status(200).send(`[EXITO] Nueva tarea añadida al usuario: ${username}`)
}

module.exports = {
    createService,
    getServices,
    markAsComplete,
    newTask
} 