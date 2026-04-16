const { Schema, model } = require("mongoose");

const GroupInfoSchema= new Schema({
    name:String
}) 


const ChatGroups= model("ChatGroups",GroupInfoSchema);

module.exports=ChatGroups;