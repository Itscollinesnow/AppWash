// DEPENDENCIES 
const express = require('express');
const mongoose = require('mongoose');
const Manager = require('./models/Manager')
const homeRoute = require('./routes/homeRoute');
const authRoutes = require('./routes/authRoutes');
const registerRoutes = require('./routes/registerRoutes')
const reportRoutes = require('./routes/reportRoutes')
const moment = require('moment');
require('dotenv').config();

const passport = require('passport');

const expressSession = require('express-session')({
  secret: 'secret',
  resave: false,
  saveUninitialized: false 
});

// INSTANTIATIONS
// instatiate express object and assign it to a variable app 
const app = express();

//mongodb connection
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});


// CONFIGURATIONS
app.locals.moment = moment
app.set('view engine', 'pug');
app.set('views', './views');

// MIDDLEWARE
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'));
app.use(expressSession);
app.use(passport.initialize());
app.use(passport.session());

/* PASSPORT LOCAL AUTHENTICATION */

passport.use(Manager.createStrategy());
passport.serializeUser(Manager.serializeUser());
passport.deserializeUser(Manager.deserializeUser());

var loginChecker = function (req, res, next) {
  if (req.path != '/login' && req.path !='/register' && !req.session.user) {
    res.redirect('/login')
  }
  next()
}
app.use(loginChecker)

// ROUTES
app.use('/', homeRoute)
app.use('/',authRoutes)
// Routes to register a managers,cars
app.use('/register', registerRoutes)

// Routes to get reports
app.use('/reports', reportRoutes)

// handle non existing routes
app.get('*', (req, res)=> {
    res.status(404).send('This is an invalid URL')
})

// BOOTSRRAPPING SERVER
app.listen(3000, () => console.log('listening on port 3000'));
