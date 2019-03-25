import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
  id: Number,
  cost: String,
  reviews: String,
  name: {
    type: String,
    validate: {
      validator(v) {
        return /^[A-Z]+/.test(v);
      },
      message: '{VALUE} is not a valid product name!',
    },
    required: [true, 'Product name required'],
  },
  lastModifiedDate: { type: Date, default: Date.now },
});

productSchema.pre('update', (next) => {
  this.lastModifiedDate = Date.now;
  next();
});

const Product = mongoose.model('Product', productSchema);

export default Product;
