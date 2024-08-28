const mongoose= require('mongoose')
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {type: String, required:true},
  email: {type:String,required: true}, // if we give unique:true here then index will be created in mongodb
  password:{type:String, required: true},
  date: { type: Date, default: Date.now },
//   mobileNo:{type: Number, required: true}
});

module.exports = mongoose.model('user', userSchema)