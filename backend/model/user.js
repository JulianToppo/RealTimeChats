const { Schema, model } = require("mongoose");

const UserSchema= new Schema({
    name:String,
    age:Number
}) 


const User= model("User",UserSchema);

module.exports=User;