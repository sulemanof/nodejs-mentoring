import mongoose from 'mongoose';

const citySchema = mongoose.Schema({
  id: Number,
  name: String,
  country: String,
  capital: Boolean,
  location: {
    lat: Number,
    long: Number,
  },
  lastModifiedDate: { type: Date, default: Date.now },
});

citySchema.pre('update', (next) => {
  this.lastModifiedDate = Date.now;
  next();
});


const City = mongoose.model('City', citySchema);

export default City;
