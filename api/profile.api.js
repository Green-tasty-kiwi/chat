const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const UsersSchema = require('../database/users.schema');

const avatarStorage = multer.diskStorage({
    destination: function (request, file, cb) {
        const userId = request.session.passport.user.id;
        const dir = path.join(__dirname, `../uploads/${userId}/`);
        fs.mkdirSync(dir, { recursive: true });
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        cb(null, `avatar${path.extname(file.originalname)}`);
    },
});

const accessMiddleware = require('../middleware/access.middleware');
module.exports = router
    .post(
        '/avatar',
        accessMiddleware,
        multer({ storage: avatarStorage }).single('avatar'),
        async function (request, response, next) {
            const user = request.session.passport.user;
            const filename = request.file.filename;
            await UsersSchema.updateOne({ _id: user.id }, { avatar: filename });
            response.redirect('/profile');
        }
    )
    .get('/avatar', function (request, response, next) {
        const user = request.session.passport.user;
        if (user.avatar) {
            response.sendFile(
                path.join(__dirname, `../uploads/${user.id}/${user.avatar}`)
            );
        } else {
            response.sendFile(
                path.join(
                    __dirname,
                    '../views/assets/images/default-avatar.png'
                )
            );
        }
    });
