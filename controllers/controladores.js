require("dotenv").config();

const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const fs = require('fs').promises

const db = require('../db')

let updateComment;

const addComment = async (req, res) => {
    const {userId, comments} = req.body
    const connection = await db.getConnection()
    
    const updateComment = `UPDATE services SET comments= "${comments}" where userId=${userId}`
    
    await connection.query(updateComment)

    res.sendStatus(200)
    
}

const uploadFile = async (id, connection) =>{

}

module.exports = {
    addComment,
    uploadFile
};