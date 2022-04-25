const getServices = async (req, res) => {

    const connection = await connection.query();
    const sqlGetServices = `select * from services`
    let services = await connection.query(sqlGetServices)
    

    if (services[0].length === 0) {
        return undefined
    } else {
        return services[0][0]
    }

}
const listProducts = async (req, res) => {
    // http://localhost:4444/product?max_price=2000&min_price=1000
    // http://localhost:4444/product?max_price=2000
    // http://localhost:4444/product?min_price=1000
    // http://localhost:4444/product
    const { max_price, min_price } = req.query

    const connection = await db.getConnection()
    
    let sql = 'select id, name, price, category from products'
    let filters = []
    
    if (min_price) {
        filters.push(`price >= ${min_price}`)
    }

    if (max_price) {
        filters.push(`price <= ${max_price}`)
    }

    // si la longitud de filters es distinto de cero
    // significa que nos pasaron al menos un filtro, min_price o max_price,
    // y por tanto tenemos que añadir el where a la sentencia sql
    if (filters.length !== 0) {
        sql = `${sql} where ${filters.join(' and ')}`
    }

    const listOfProducts = await connection.query(sql)

    let filteredProducts = listOfProducts[0]

    res.send(filteredProducts)
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