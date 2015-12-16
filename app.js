"use strict";

global.config = require('./config')
global.fs = require('fs')
global.express = require('express')

var morgan = require('morgan')
var bodyParser = require('body-parser')
var app = express()

require('./config/mongodb')(config)

fs.readdirSync(__dirname + '/models' ).forEach(function (file) {
  if (~file.indexOf('.js')) require(__dirname + '/models'  + '/' + file)
})

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var router = require('./routes')

app.use('/', router);

var server = app.listen(3000, function () {
  console.log("\n✔ Express server listening on port %d in %s env", server.address().port, process.env.NODE_ENV || 'development' );
})

module.exports = server
