const { Schema, model } = require("mongoose");

const MessagesSchema= new Schema({
    message:String,
    roomId:Number
}) 


const Messages= model("Messages",MessagesSchema);

module.exports=Messages;