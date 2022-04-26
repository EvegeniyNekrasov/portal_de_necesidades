require("dotenv").config();

const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const fs = require('fs').promises

const db = require('../db')

const register = async (req, res) => {

// 1) Comprobamos que nos pasan usuario y contraseña.
    const { username, password, mail, biography } = req.body

    if (!username || !password) {
        res.sendStatus(400)
        return
    }

    const connection = await db.getConnection()

 //2) Comprobamos si el usuario ya existe error (409)
    const sqlGetUser = `select * from users where username="${username}"`

    const users = await connection.query(sqlGetUser)

    if (users[0].length !== 0) {
        res.sendStatus(409)
        connection.release()
        return
    }

// 3) Cifrar la password con bcrypt
    const hiddenPassword = await bcrypt.hash(password, 10)

// 4) Registramos en DB
    
    const sqlInsertUser = `
                    insert into users (username, password, mail, biography) 
                    values ("${username}", "${hiddenPassword}", "${mail}", "${biography}")`
       await connection.query(sqlInsertUser)
       connection.release()
       res.sendStatus(200)
}

module.exports = {
    register
};