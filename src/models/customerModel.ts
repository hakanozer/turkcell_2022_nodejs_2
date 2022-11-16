import mongoose from "mongoose";

const Schema = mongoose.Schema

const customerSchema = new Schema({
    name: String,
    email: String,
    phone: String
})

export const customerModel = mongoose.model('customer', customerSchema)