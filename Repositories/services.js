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
    const {userId, serviceId} = req.body
    const connection = await db.getConnection()
    let sql = ``

    await connection.query(sql)
}

const newTask = async (req, res) => {
    // try{
     const connection = await db.getConnection()
     const userId = req.appInfo.id
     const sqlGetServiceId = `select id from services where userId=${userId}`
     const serviceId = await connection.query(sqlGetServiceId)
     const sqlGetLastService = `select id_service from completework where id_user=${userId} order by id_service desc limit 1`
     const lastService = await connection.query(sqlGetLastService)
 
     console.log("[SERVICEID]", serviceId[0].length)
     console.log("[lastService]", lastService[0])
    /*for(let i=0 ; i < serviceId[0].length ; i++){
     console.log("[fuera del if]", serviceId[0].length)
     console.log("[SERVICEID]", serviceId[0][i].id)
     console.log("[fuera del if]",lastService[0][i].id_service)
     if(serviceId[0][i].id !== lastService[0][i].id_service){
         const newTaskIn = insert into completework (id_user, id_service) values (${userId}, ${serviceId[0][i].id})
         await connection.query(newTaskIn)
         console.log(serviceId[0][i].id)
         console.log(lastService[0][i].id_service)
 
     }
 
 }
     //console.log(nuevoId)
 
 
 
 
 
     const username = select username from users where id=${userId}
     const username2 = await connection.query(username)*/
     //res.status(200).send([EXITO] Nueva tarea añadida al usuario: ${username2[0][0].username})
 
     //} catch (e) {
 
 //}
 }
module.exports = {
    createService,
    getServices,
    markAsComplete,
    newTask
} 