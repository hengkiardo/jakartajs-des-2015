var Route = express.Router()

var mongoose = require('mongoose')
var ProductModel  = mongoose.model('Product')
var Request   = require('request')
var async     = require('async')
var _         = require('lodash')
var moment    = require('moment')
var cheerio   = require('cheerio')


Route.get('/scrapping', function (req, res) {
  async.waterfall([
    requestPage,
    cheerioScrape
  ], function (err, result) {

    if (err) {
      console.log(err)
    }
    return res.status(200).send('scrapping done!')
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

  function cheerioScrape(html, callback) {

    var $ = cheerio.load(html)

    var productCards = []

    var insertJobToDB = function(card, cb) {

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

      var NewProduct = new ProductModel(singleProduct)

      NewProduct.save(function (err, newJob) {

        if (err) {
          // console.log(err)
        } else {
          productCards.push(singleProduct)
        }

        cb()
      })
    };

    async.each( $('.component-product_list .product-card') , insertJobToDB, function (err) {
      callback(null, productCards)
    })
  }
})

Route.get('/products', function (req, res) {

  ProductModel
    .find({})
    .exec(function (err, products) {
      return res.status(200).json({products: products })
    })

})

module.exports = Route
