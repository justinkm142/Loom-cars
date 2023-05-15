import mongoose from 'mongoose'

const Schema = mongoose.Schema

const userSchema = new Schema({
  name:{
    type: String,
    required:true
  },
  email: {
    type: String,
    required: true
  },
  phone:{
    type:Number,
    required:true
  },
  password: {
    type: String,
    required: true
  },
  isBlocked: {
    type: Boolean,
    default:false
  },
  isHosted: {
    type: Boolean,
    default:false
  },
  carList:{
    type:Array
  },
  addressList:{
    type:Array
  },
  gender:{
    type:String
  },
  location: {
    type: String,
  },
  walletId: {
    type:String
  },
  bookings: {
    type:Array
  },
  imageUrl: {
    type: String,
    default:"/Basic_Ui_(186).jpg"
  }

}, { timestamps: true })

export const UserModel = mongoose.model('UserModel', userSchema);