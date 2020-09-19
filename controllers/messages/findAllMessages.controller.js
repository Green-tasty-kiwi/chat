const MessagesSchema = require('../../database/messages.schema');
async function findAll(request, response, next) {
    try {
        const messages = await MessagesSchema.find()
            .populate('receiver', ['firstName', 'lastName'])
            .populate('sender', ['firstName', 'lastName']);
        response.send(messages);
    } catch (error) {
        console.error(error);
        response.send('error');
    }
}

module.exports = findAll;
