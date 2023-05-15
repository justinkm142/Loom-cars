import mongoose from 'mongoose'

const Schema = mongoose.Schema

const bookingSchema = new Schema({

  carId:{
    type: mongoose.Schema.Types.ObjectId,
    required:true
  },
  userId: {
    type:  mongoose.Schema.Types.ObjectId,
    required: true
  },
  datesBooked: {
    type: Array,

  },
  paymentMethod:{
    type:String,
    required:true
  },
  paymentStatus: {
    type: String,
    required: true,
    default:"Pending"
  },
  bookingStatus: {
    type: String,
    required:true,
    default:"Pending"
  },
  name: {
    type: String,
    required:true,
  },
  email: {
    type: String,
    required:true,
  },
  comments: {
    type: String,
    required:true,
  },
  phone: {
    type: Number,
    required:true,
  },
  amount: {
    type: Number,
    required:true,
  }

}, { timestamps: true })

export const BookingModel = mongoose.model('BookingModel', bookingSchema);