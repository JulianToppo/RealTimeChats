const { Schema, model } = require("mongoose");

const MessagesSchema= new Schema({
    message:String,
    roomId:String,
    username:String
}) 


const Messages= model("Messages",MessagesSchema);

module.exports=Messages;