const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    phone:Number,
    bloodGroup:String,
    gender:String,
    weight:Number,
    age:Number,
    address:String,
    pincode:Number,
    healthIssues:String,

})

const UserModel = mongoose.model("user",UserSchema)
module.exports = UserModel