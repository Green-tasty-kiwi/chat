const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const UsersSchema = require('../database/users.schema');
const bcrypt = require('bcrypt');
const saltRounds = 10;

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
    .post('/', accessMiddleware, async function (request, response, next) {
        const userId = request.session.passport.user.id;

        const user = await UsersSchema.findById(userId);
        const password = request.body.password;

        async function checkUser(user, password) {
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return response.send('Incorrect password.');
            }
        }
        if (request.body.newPassword) {
            await checkUser(user, password);
        }

        try {
            const newFirstName = request.body.firstName;
            const newLastName = request.body.lastName;
            const newEmail = request.body.email;
            const newPassword = request.body.newPassword;

            const userData = {
                firstName: newFirstName,
                lastName: newLastName,
                email: newEmail,
            };

            if (newPassword) {
                userData.password = bcrypt.hashSync(newPassword, saltRounds);
            }

            await UsersSchema.updateOne({ _id: userId }, userData);

            const newUser = await UsersSchema.findById(user.id);
            request.session.passport.user = newUser;
            request.session.save(function (error) {
                request.session.reload(function (error) {
                    response.redirect('/profile');
                });
            });
        } catch (error) {
            console.error(error);
            response.send('error');
        }
    })
    .post(
        '/avatar',
        accessMiddleware,
        multer({ storage: avatarStorage }).single('avatar'),
        async function (request, response, next) {
            const user = request.session.passport.user;
            const filename = request.file.filename;
            await UsersSchema.updateOne({ _id: user.id }, { avatar: filename });
            const newUser = await UsersSchema.findById(user.id);
            request.session.passport.user = newUser;
            request.session.save(function (error) {
                request.session.reload(function (error) {
                    response.redirect('/profile');
                });
            });
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
