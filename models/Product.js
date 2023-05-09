const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema({

  prodName: { type: String },
  prodDesc: { type: String },
  prodImg: {
    data: Buffer,
    contentType: String,
    imgUrl: String
  },
  prodPrice: { type: Number },
  prodAvail: { type: Boolean, default: true },
  prodBrand: { type: String },
  prodCateg: { type: String },
  prodReviews: { type: String },
  prodRate: { type: Number ,default:0 },
  ownerId:{type:String},
  prodRateNbr:{type:Number,default:1}
})


ProductSchema.pre('findOneAndUpdate', function (next) {
  console.log('Middleware pre-hook called!');
  const currentDate = new Date();
  // this.update({ updated_at: currentDate });
  this.set({ updated_at: currentDate });
  next();
});


module.exports = mongoose.model('Product', ProductSchema)
