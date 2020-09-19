const UsersSchema = require('../../database/users.schema');

async function findOne(request, response, next) {
    const userId = request.params.id;
    try {
        const user = await UsersSchema.findById(userId);
        response.send(user);
    } catch (error) {
        console.error(error);
        response.send('error');
    }
}

module.exports = findOne;
