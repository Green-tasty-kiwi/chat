const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const router = express.Router();
const UsersSchema = require('../database/users.schema');

const bcrypt = require('bcrypt');
const saltRounds = 10;

passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            session: true,
        },
        async function (email, password, done) {
            try {
                const user = await UsersSchema.findOne({ email: email });
                if (!user) {
                    return done(null, false, {
                        message: 'Incorrect email.',
                    });
                }
                if (!bcrypt.compareSync(password, user.password)) {
                    return done(null, false, {
                        message: 'Incorrect password.',
                    });
                }
                return done(null, user);
            } catch (err) {
                if (err) {
                    return done(err);
                }
            }
        }
    )
);

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(async function (id, done) {
    const user = await UsersSchema.findById(id);
    done(null, user);
});

module.exports = router
    .post('/signup', async (request, response) => {
        const body = request.body;
        try {
            const hash = bcrypt.hashSync(body.password, saltRounds);
            const user = await UsersSchema.create({
                firstName: body.firstName,
                lastName: body.lastName,
                password: hash,
                email: body.email,
            });
            request.session.passport = { user: user };
            response.redirect('/rooms');
        } catch (error) {
            console.error(error);
            response.send('Error');
        }
    })
    .post(
        '/signin',
        passport.authenticate('local', { failureRedirect: '/signin' }),
        function (request, response) {
            response.redirect('/rooms');
        }
    )
    .post('/logout', async (request, response) => {
        try {
            req.logout();
            response.redirect('/signin');
        } catch (error) {
            console.error(error);
            response.send('Error');
        }
    });
