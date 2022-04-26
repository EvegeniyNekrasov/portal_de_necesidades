require("dotenv").config();

const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const fs = require('fs').promises

const db = require('../db')

let updateComment;

const addComment = async (req, res) => {
    const {username, comments} = req.body
    if (!username || !comments) {
        res.status(403).send("[ERROR] Faltan datos para añadir un comentario")
        return
    }
    const selectUserId = `select userId from services inner join users on users.id = services.userId where username ='${username}'`
    const connection = await db.getConnection()
    const userId = await connection.query(selectUserId)
    
    const user2 =userId[0][0].userId
   
    updateComment = `UPDATE services SET comments= "${comments}" where userId=${user2}`
    
    
    await connection.query(updateComment)

    res.status(200).send("[EXITO] Comentario añadido correctamente")
    
    
}

const uploadFile = async (id, connection) =>{

}

module.exports = {
    addComment,
    uploadFile
};