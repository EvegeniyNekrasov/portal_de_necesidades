const userExists = async (id, connection) => {

    const sql = `select * from users where id=${id}`

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