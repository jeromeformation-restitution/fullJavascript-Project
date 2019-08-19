const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const errorHandler = require('errorhandler');
const userRoutes = require('./routes/users');
const PostRoutes = require('./routes/post');
const session = require('express-session');
const cors = require('cors');

//Configure mongoose's promise to global promise
mongoose.promise = global.Promise;

//Configure isProduction variable
const isProduction = process.env.NODE_ENV === 'production';

//Initiate our app
const app = express();

//Configure our app
app.use(cors());
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'projet-node', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));
app.use(userRoutes);
app.use(PostRoutes);

if(!isProduction){
  app.use(errorHandler());
}
//Configure Mongoose
mongoose.connect('mongodb://localhost/prestataires', { useNewUrlParser: true, useCreateIndex: true }).then(() =>{
  console.log('connected to database');
}).catch(() =>{
  console.log('failed connected to database');
});

//Error handlers & middlewares
if(!isProduction) {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
        error: err,
      },
    });
  });
}
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use((err, req, res, next) => {
  res.status(err.status || 500);

  res.json({
    errors: {
      message: err.message,
      error: {},
    },
  });
});

app.listen(8000, () => console.log('Server running on http://localhost:8000/'));

module.exports = app;
