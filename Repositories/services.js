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
 //   try{
    const connection = await db.getConnection()
    const userId = req.appInfo.id
    const sqlGetServiceId = `select id from services where userId=${userId}`
    const idService = await connection.query(sqlGetServiceId)
    const prueba = await connection.query(`select id_service from completework where id_user=${userId}`)
    let i = prueba[0].length;
    for(i ; i < idService[0].length ; i++){
         //prueba[0])
        if(idService[0].length !== prueba[0][i].id_service){
        //const newTaskIn = `insert into completework (id_user, id_service) values (${userId}, ${idService[0][i].id})`
        //await connection.query(newTaskIn)
        
      
        }
        console.log("dentro del if", idService[0][i].id)
        console.log(prueba[0][i])
    }
    const username = `select username from users where id=${userId}`
    const username2 = await connection.query(username)
    //console.log(idService[0][1])
    //res.status(200).send(`[EXITO] Nueva tarea añadida al usuario: ${username2[0][0].username}`)

/*} catch (e) {
   console.log(e)
}*/
}
module.exports = {
    createService,
    getServices,
    markAsComplete,
    newTask
} 