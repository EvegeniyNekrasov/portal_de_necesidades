let updateComment;

const addComment = async (userId, comments, connection) => {
    try {
        const updateComment = `UPDATE services SET comments= "${comments}" where userId=${userId}`
        await connection.query(updateComment)
        console.log(updateComment);
    } catch (e) {
        console.log('[addComment] ', e)
        throw new Error('database-error')
    }

}

const uploadFile = async (id, connection) =>{

}

module.exports = {
    addComment,
    uploadFile
};