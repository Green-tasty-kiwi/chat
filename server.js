const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const session = require('express-session');
const passport = require('passport');
const path = require('path');

const exphbs = require('express-handlebars');
const FileStore = require('session-file-store')(session);
const database = require('./database');
const apiRouter = require('./api');
const views = require('./views');

const sessionSettings = {
    store: new FileStore({}),
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    cookie: {},
};

const handlebars = exphbs.create({
    layoutsDir: path.join(__dirname, '/views/layouts'),
    partialsDir: path.join(__dirname, '/views/partials'),
    defaultLayout: 'layout',
    extname: '.hbs',
});

app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs');

app.use(require('cookie-parser')());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(session(sessionSettings));

app.use(passport.initialize());
app.use(passport.session());
database();

app.use('/static', express.static(path.join(__dirname, 'views/assets')));
app.use(apiRouter);
app.use(views);

app.listen(port, () => {
    console.log(`App is listening at http://localhost:${port}`);
});
