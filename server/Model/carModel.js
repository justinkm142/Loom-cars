import mongoose from 'mongoose'

const Schema = mongoose.Schema

const carSchema = new Schema({
  carNumber:{
    type: String,
    required:true
  },
  carMake: {
    type: String,
    required: true
  },
  carModel: {
    type: String,
    required: true
  },
  manufactureYear:{
    type:Number,
    required:true
  },
  kmDriven: {
    type: String,
    required: true
  },
  availableLocation: {
    type: String,
    required:true
  },
  fuelType: {
    type: String,
    required:true
  },
  
  transmission: {
    type:String,
    required:true
  },

  seatCapacity: {
    type:Number,
    required:true
  },
  category: {
    type:String,
    required:true
  },
  images:{
    type:Array
  },
  feature:{
    type:Array
  },
  isVerified:{
    type:Boolean,
    default:false
  },
  carStatus:{
    type:String,
    default:"Verification Pending"
  },
  availableDates:{
    type:Array
  },
  bookedDates:{
    type:Array
  },
  actualPrice:{
    type:Number,
  },
  rentingPrice:{
    type:Number,
  },
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    required:true
  }

}, { timestamps: true })

export const CarModel = mongoose.model('CarModel', carSchema);