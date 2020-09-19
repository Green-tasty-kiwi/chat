const UsersSchema = require('../../database/users.schema');

async function createOne(request, response, next) {
    const body = request.body;

    try {
        const user = await UsersSchema.create({
            firstName: body.firstName,
            lastName: body.lastName,
            password: body.password,
            email: body.email,
        });

        response.send(user);
    } catch (error) {
        console.error(error);
        response.send('Error');
    }
}

module.exports = createOne;
