"use strict";

var fs       = require('fs')
var Request   = require('request')
var async     = require('async')
var _         = require('lodash')

async.waterfall([
  requestPage
], function (err, result) {
  if (err) console.log(err)
  // console.log(result)
})

function requestPage(callback) {
  var options = {
    url: 'http://www.lazada.co.id/beli-handphone-tablet/',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.125 Safari/537.36',
    }
  };

  Request(options, function (err, response, body) {
    console.log(err, _.result(response, 'statusCode'))
    callback(null, body)
  })
}
