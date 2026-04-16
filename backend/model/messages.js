const { Schema, model } = require("mongoose");

const MessagesSchema= new Schema({
    message:String,
    roomId:Number,
    username:String
}) 


const Messages= model("Messages",MessagesSchema);

module.exports=Messages;