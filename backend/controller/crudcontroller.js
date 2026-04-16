const User = require("../model/user")
const path= require("path")
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


module.exports={
    testingControllerRequestHandler,
    addingVaues
}