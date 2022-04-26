const userExists = async (username, connection) => {

    const sql = `select * from users where username=${username}`

    const users = await connection.query(sql)

    if (users[0].length === 0) {
        return false
    } else {
        return true
    }
    
}


module.exports = {
    userExists
}