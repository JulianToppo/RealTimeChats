const express= require("express");
const path= require("path");

const app=express();


const port=3000;

app.use(express.json());

app.get("/",(req,res,next)=>{
    res.send("Hello world");
})

app.get("/check",(req,res,next)=>{
    res.json({name:"Julian",age:31});
})

app.post("/check",(req,res,next)=>{
    const {name,age}=req.body;
    res.send({name,age})
})

app.get("/home",(req,res,next)=>{
    // console.log(path.join(__dirname,"view","homepage.js"))
    res.sendFile(path.join(__dirname,"view","homepage.html"));
    res.redirect("/check");
})

app.listen(port, ()=>{
    console.log("Server is running");
})