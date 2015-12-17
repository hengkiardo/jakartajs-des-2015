
function define(agenda) {

  agenda.define('lazada.co.id - handphone tablet', function (job, done) {

    for (var i = 0; i <= 3; i++) {

      require('./handphone-tablet.js')(done, job, i)

    }
  })

  agenda.every('1 seconds', 'lazada.co.id - handphone tablet');
}


module.exports = define;
