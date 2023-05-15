import mongoose from 'mongoose'

const Schema = mongoose.Schema

const adminSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    default:"/Basic_Ui_(186).jpg"
  }

}, { timestamps: true })

export const Admin = mongoose.model('Admin', adminSchema);