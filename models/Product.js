const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  ownerId: {
    type: String,
    required: true
  },
  prodName: {
    type: String,
    required: true
  },
  prodDesc: {
    type: String,
    required: true
  },
  prodImg: {
    type: String,
    required: true
  },
  prodPrice: {
    type: Number,
    required: true
  },
  prodAvail: {
    type: Boolean,
    required: true
  },
  prodBrand: {
    type: String,
    required: true
  },
  prodCateg: {
    type: String,
    required: true
  },
  prodReviews: {
    type: String,
    required: true
  },
  prodRate: {
    type: Number,
    required: true
  },
  __v: {
    type: Number,
    required: true,
    default: 0
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
