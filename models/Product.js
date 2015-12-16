"use strict";

var mongoose = require('mongoose')

var Product = new mongoose.Schema({
    name : {
      type: String,
      require: true
    },
    photo: {
      type: String,
      require: true,
    },
    product_link: {
      type: String,
      require: true
    },
    price_normal : {
      type: String,
      require: true
    },
    price_discount : {
      type: String
    },
    sale_number : {
      type: String
    },
    rating: {},
    isCredit: {
      type: Boolean
    }
  });

Product.plugin(require('mongoose-timestamp'))

var ProductModel = mongoose.model('Product', Product)

module.exports = ProductModel

