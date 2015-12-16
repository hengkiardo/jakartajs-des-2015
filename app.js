"use strict";

global.config = require('./config')

var fs       = require('fs')
var express  = require('express')
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

agenda.purge(function (err, numRemoved) {
  Lazada(agenda)
})

agenda.start()
