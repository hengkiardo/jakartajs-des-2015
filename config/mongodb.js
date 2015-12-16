// Connect to mongodb
var mongoose  = require('mongoose')

module.exports = function (config) {

  var options = {
    cache: true, // start caching
    ttl: 10 // 30 seconds
  };

  var connect = function () {
    var options = {
      server: {
        socketOptions: { keepAlive: 1 }
      },
      auto_reconnect:true
    }
    mongoose.connect(config.mongodb, options)
  };

  var DB = connect();

  // Error handler
  mongoose.connection.on('error', function (err) {
    console.log('error', 'error mongodb', err)
  })

  // Reconnect when closed
  mongoose.connection.on('disconnected', function (err) {
    console.log('info', 'mongodb disconnected ', err)
    connect()
  })

  return DB
}
