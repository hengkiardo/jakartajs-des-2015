
function define(agenda) {

  agenda.define('lazada.co.id - handphone tablet', function (job, done) {

    require('./handphone-tablet.js')(done, job)

  })

  agenda.every('1 minutes', 'lazada.co.id - handphone tablet');
}


module.exports = define;
