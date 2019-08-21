var express = require('express');
var router = express.Router();
require('dotenv').config({path:'./config/.env'});
const appName = process.env.APP_NAME;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { name: appName, title: 'API ' + appName  });
});

module.exports = router;
