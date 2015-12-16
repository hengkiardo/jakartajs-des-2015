"use strict";

var fs       = require('fs')
var Request   = require('request')
var async     = require('async')
var _         = require('lodash')
var cheerio   = require('cheerio')

async.waterfall([
  requestPage,
  cheerioScrape
], function (err, result) {

  if (err) {
    console.log(err)
  }

  console.log(result)

})

function requestPage(callback) {

  var options = {
    url: 'http://www.lazada.co.id/beli-handphone-tablet/',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.125 Safari/537.36',
    }
  };

  Request(options, function (err, response, body) {
    // console.log(err, _.result(response, 'statusCode'))
    callback(null, body)
  })
}

function cheerioScrape(html, callback) {

  var $ = cheerio.load(html)

  var productCards = []

  var parsingProducts = function(card, cb) {

    var singleProduct = {
      name : $(card).find('.product-card__name-wrap span').attr('title'),

      photo : $(card).find('.product-card__img img').attr('data-original'),

      product_link : $(card).find('> a').attr('href'),

      price_normal : $(card).find('.old-price-wrap .product-card__old-price').text(),

      price_discount : $(card).find('.old-price-wrap .product-card__sale').text(),

      sale_number : $(card).find('.product-card__price').text(),

      isCredit : $(card).hasClass('IP'),

      rating : {
        number : $(card).find('.rating__number').text(),
        star : $(card).find('.icon-rating_stars_disabled').attr('title')
      }
    }

    productCards.push(singleProduct)

    cb()
  };

  async.each( $('.component-product_list .product-card') , parsingProducts, function (err) {
    callback(null, productCards)
  })
}
