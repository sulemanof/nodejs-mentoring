import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  id: Number,
  name: String,
  password: String,
  isModerator: Boolean,
  email: String,
  lastModifiedDate: { type: Date, default: Date.now },
});

userSchema.pre('update', (next) => {
  this.lastModifiedDate = Date.now;
  next();
});

const User = mongoose.model('User', userSchema);

export default User;
