const MessagesSchema = require('../../database/messages.schema');
async function postOne(request, response, next) {
    const senderId = request.session.passport.user;
    const text = request.body.text;
    const room = request.body.room;

    try {
        if (!senderId) {
            response.send('SENDER');
        }
        let message = await MessagesSchema.create({
            text: text,
            room: room,
            sender: senderId,
        });

        message = await MessagesSchema.findById(message._id).populate(
            'sender',
            ['firstName', 'lastName', 'createdAt', 'updatedAt']
        );

        response.send(message);
    } catch (error) {
        console.error(error);
        response.send(error);
    }
}

module.exports = postOne;
