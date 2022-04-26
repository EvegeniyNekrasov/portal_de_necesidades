require("dotenv").config();

const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const fs = require('fs').promises

const db = require('../db')



const getServices = async (req, res) => {
    
    const connection = await db.getConnection()
}

// Creamos el nuevo servicio, pero antes de poder crearlo, el usuario tiene que estar creado. Por el uso del foreign key userID = id de tabla users
const createService = async (req, res) => {
    try{
        const connection = await db.getConnection()
        const {title, description, file, comments, userId} = req.body
        const sqlCreateService = `insert into services (title, description, file, comments, userId) 
        values ("${title}","${description}", "${file}", "${comments}", ${userId})`
        await connection.query(sqlCreateService)
        res.sendStatus(200)
    } catch (e) {
        console.log('[createService] ', e)
        res.sendStatus(403)
    }

}

const markAsComplete = async (req, res) => {
    const {userId, serviceId} = req.body
    const connection = await db.getConnection()
    let sql = `insert into completeworks (id_user, id_service) values (${userId}, ${serviceId})`

    await connection.query(sql)
}

module.exports = {
    createService,
    getServices,
    markAsComplete
} 