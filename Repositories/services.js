const getServices = async (id, connection) => {

    const sqlGetServices = `select * from services where id=${id}`

    const services = await connection.query(sqlGetServices)

    if (services[0].length === 0) {
        return undefined
    } else {
        return services[0][0]
    }

}

const createService = async (title, describe, file, comments, userId, connection) => {
    try {
        await connection.query(`
    insert into services (title, describe, file, comments, userId) 
    values ("${title}","${describe}", ${file}, "${comments}", ${userId})
`)
    } catch (e) {
        console.log('[createService] ', e)
        throw new Error('database-error')
    }

}

const markAsComplete = async (userId, serviceId, connection) => {
    let sql = `insert into completeworks (id_user, id_service) values (${userId}, ${serviceId})`

    await connection.query(sql)
}

module.exports = {
    createService,
    getServices,
    markAsComplete
} 