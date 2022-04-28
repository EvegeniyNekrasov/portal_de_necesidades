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
        const {title, description, file, comments} = req.body
        if(!title || !description || !file || !comments){
            res.status(403).send("[ERROR] el servicio no esta creado, rellene los campos necesarios e intentelo de nuevo")
            return
        }
    // Extraemos el id del usuario que crea el servicio.
        const userId = req.appInfo.id
    
    // Insertamos en DB los servicios creados por el usuario.
        const sqlCreateService = `insert into services (title, description, file, comments, userId) 
        values ("${title}","${description}", "${file}", "${comments}", ${userId})`
        await connection.query(sqlCreateService)

    // Insertamos en tabla aux, completework, los datos de este nuevo servicio creado.
        const sqlServicesId = `select id from services where userId=${userId}`
        
        const getServiceId = await connection.query(sqlServicesId)
        
        
        console.log(getServiceId[0][2])
        
//        const markAsComplete = `insert into completeworks (id_user, id_service) values (${userId}, ${serviceId})`
        res.status(200).send("[EXITO] Servicio creado correctamente")
        connection.release()
 

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