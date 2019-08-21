//Imports
const createError = require('http-errors');
const errorHandler = require('errorhandler');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require('cors');
let logger = require('morgan');
const methodOverride = require('method-override');
//Imports de routage
const indexRoutes = require('./routes/index');
const userRoutes = require('./routes/users');
const postRoutes = require('./routes/post');
const msgRoutes =  require('./routes/msg');
//Imports des variables d'environnement
require('dotenv').config({path:'./config/.env'});


//Configure mongoose's promise to global promise
mongoose.promise = global.Promise;
//Configure isProduction variable
const isProduction = process.env.NODE_ENV === 'production';
//Initialisation de l'app
let app = express();

//Connexion à la base de données
console.log('mongoose version :' + mongoose.version);
const DB_URL = process.env.MONGODB_URL;
//Configure Mongoose
mongoose.connect(DB_URL, { useNewUrlParser: true, useCreateIndex: true }).then(() =>{
  console.log('connected to database');
}).catch(() =>{
  console.log('failed connected to database');
});

//Les middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method;
    delete req.body._method;
    return method
  }
}));
app.use(cors());
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'projet-node', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

//Les middlewares de routage
app.use('/', indexRoutes)
app.use('/users',userRoutes);
app.use('/annonces',postRoutes);
app.use('/msg', msgRoutes);

//Moteurs de template
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Gestion des erreurs

if(!isProduction){
  app.use(errorHandler());
}
app.use(function(req, res, next) {
  next(createError(404));
});
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;
