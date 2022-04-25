require("dotenv").config();

const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const fs = require('fs').promises

const db = require('../DB/db')

//const usersRepository = require('../Repositories/users')

const register = async (req, res) => {

// 1) comprobar que nos pasan user y password
    const { username, password } = req.body

    if (!username || !password) {
        res.sendStatus(400)
        return
    }

    const connection = await db.getConnection()

 // 2) comprobar si el usuario que nos pasan ya existe (409)
    const sqlGetUser = `select * from users where username="${username}"`

    const users = await connection.query(sqlGetUser)

// si no existe en la base de datos la longitud del array será cero
    if (users[0].length !== 0) {
        res.sendStatus(409)
        connection.release()
        return
    }

// 3) cifrar la password con bcrypt
    const hiddenPassword = await bcrypt.hash(password, 10)

// 4) almacenamos
    const sqlInsertUser = `
                    insert into users (username, password, mail, biography, insession) 
                    values ("${username}", "${hiddenPassword}", ${mail}, "${biography}", false)`

    await connection.query(sqlInsertUser)
}

module.exports = {
    register
};