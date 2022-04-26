require("dotenv").config();

const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const fs = require('fs').promises

const db = require('../db')

const login = async (req, res) => {

// 1) comprobamos que nos pasan login y password
    const { username, password } = req.body

    if (!username || !password) {
        res.sendStatus(400)
        return
    }
    const connection = await db.getConnection()

// 2) obtenemos el usuario de la bbdd
    const sqlGetUser = `select * from users where username="${username}"`
    
    const users = await connection.query(sqlGetUser)
    
// compruebo si está en la bbdd ese usuario
    if (users[0].length === 0) {
        res.sendStatus(403)
        connection.release()
        return
    }
// 3) comprobar que la password es correcta
    const passwordsAreEqual = await bcrypt.compare(password, users[0][0].password)
    
    if (!passwordsAreEqual) {
        res.sendStatus(403)
        connection.release()
        return
    } else {
        const sqlChange = `update users set insession=true where username = "${username}"`
        await connection.query(sqlChange)
        connection.release()
        res.sendStatus(200)
    }
}

    module.exports = {
        login
    }