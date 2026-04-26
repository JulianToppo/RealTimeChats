const Messages = require("../model/messages")
const User = require("../model/user")
const path= require("path")
const { broadcastToRoom } = require("../utils/wsService")
// Testing the structure
const testingControllerRequestHandler= (req,res,next)=>{
    try {
        res.sendFile(path.join(__dirname,"..","view","homepage.html"))
    } catch (error) {
        res.json({err:error})
    }
}

//sendingvalues
const addingVaues=async (req,res,next)=>{
    try{

        const {name,age}=req.body;
        const userCreated=await User.create({
            name,
            age
        });

        console.log(`Created Value ${userCreated}`);


        const userFound= await User.findOne({name})

        const secondFound= await User.findById({_id:userCreated._id});

        console.log(secondFound);
        userFound.name="Abhishek";
        
        userFound.save();

        console.log("Hopefully the value is saved", userFound)

        res.json({"status":"201", "message" :"Ho gya create"});

    }catch(err){
        res.json({error:err})
    }
}
//deleting values

//updates values


const sendMessage = async (req,res)=> {
    try   
    {

        const {message,roomId,username}=req.body;
        
      // console.log( data);
      const savedMessage = await Messages.create({
        message: message,
        roomId: roomId,
        username:username
      });

      
  
   
  
      res.json({
        success: true,
        message: "Message sent",
        data: savedMessage,
      });
  
    } catch (error) {
      console.error(error);
      // res.status(500).json({
      //   success: false,
      //   error: error.message,
      // });
    }
  };
  

  const getMessagesForRoom= async (req,res)=>{
    try {
      const messages = await Messages.find({
        roomId: req.params.roomId,
      }).sort({ createdAt: 1 });
    
      res.json(messages);
      
    } catch (error) {
      res.send({err:error})
    }
  }

  

module.exports={
    testingControllerRequestHandler,
    addingVaues,
    sendMessage,getMessagesForRoom
    
}