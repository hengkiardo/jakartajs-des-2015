"use strict";

global.config = require('./config')
global.fs = require('fs')
global.express = require('express')


var Agenda   = require('agenda')
var agendaUI = require('agenda-ui')
var moment   = require('moment')
var timing   = require('./helpers/timing')

require('./config/mongodb')(config)

fs.readdirSync(__dirname + '/models' ).forEach(function (file) {

  if (~file.indexOf('.js')) require(__dirname + '/models'  + '/' + file)

})

var agenda = new Agenda({ db : { address: config.mongodb, collection: "cron"}})

var Lazada      = require('./task/lazada')


// Removes all jobs in the database without defined behaviors.
// Useful if you change a definition name and want to remove old jobs.
agenda.purge(function (err, numRemoved) {
  Lazada(agenda)
})
agenda.start()

// var morgan = require('morgan')
// var bodyParser = require('body-parser')
// var app = express()
// app.use(morgan('dev'));
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// var router = require('./routes')

// app.use('/', router);

// var server = app.listen(3000, function () {
//   console.log("\n✔ Express server listening on port %d in %s env", server.address().port, process.env.NODE_ENV || 'development' );
// })

// module.exports = server
