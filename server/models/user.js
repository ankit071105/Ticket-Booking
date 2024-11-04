import mongoose from "mongoose";

const CounterSchema = new mongoose.Schema({
  _id: String,
  count: { type: Number, default: 0 }
});
const Counter = mongoose.model("Counter", CounterSchema);

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  mobileNum: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
