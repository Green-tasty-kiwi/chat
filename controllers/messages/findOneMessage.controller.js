const MessagesSchema = require('../../database/messages.schema');
async function findOne(request, response, next) {
    let messageId = request.params.id;
    try {
        const message = await MessagesSchema.findById(messageId);
        response.send(message);
    } catch (error) {
        console.error(error);
        response.send('error');
    }
}

module.exports = findOne;
