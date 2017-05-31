const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars');
const flash = require('connect-flash');
const expressValidator = require('express-validator');
const models = require('./models');
const passport = require('./middlewares/authentication');

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession({ secret: 'keyboard cat', resave: false, saveUninitialized: true }));
app.use(expressValidator());
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', exphbs({
  layoutsDir: './views/layouts',
  defaultLayout: 'main',
}));
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/views/`);

app.use('', require('./controllers/index'));
app.use('/login', require('./controllers/login'));
app.use('/signup', require('./controllers/signup'));
app.use('/businesssignup', require('./controllers/businesssignup'));
app.use('/userprofile', require ('./controllers/user_profile'))
app.use('/businessprofile', require ('./controllers/business_profile'))
app.use('/search', require ('./controllers/search'))
app.use('/result', require ('./controllers/result'))
app.use('/logout', require ('./controllers/log-out'))
app.use('/editprofile', require ('./controllers/edit_profile'))



module.exports = app;

models.sequelize.sync().then(() => {
    console.log("App is hosting on http://127.0.0.1:8000")
    app.listen(8000);
});
