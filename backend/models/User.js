const mongoose =  require('mongoose');
const { Schema } = mongoose;

const UserScehma = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type:String,
    required:true,
    unique: true
  },
  password: {
    type:String,
    required:true
  },
  date: {
    type:Date,
    default:Date.now
  }
});

const User = mongoose.model('user',UserScehma)
module.exports = User