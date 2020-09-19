const UsersSchema = require('../../database/users.schema');

async function findAll(request, response, next) {
    try {
        const users = await UsersSchema.find();
        response.send(users);
    } catch (error) {
        console.error(error);
        response.send('error');
    }
}

module.exports = findAll;
