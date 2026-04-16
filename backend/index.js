const express= require("express");
const path= require("path");
const routes= require("./routes/routes");
const mongodb= require("./utils/db");
const db= require('./utils/db')
const {WebSocket,WebSocketServer}= require("ws");
const http= require('http')
const app=express();


app.use(express.static(path.join(__dirname, "public")));
const port=3000;

const server= http.createServer(app);
const wss= new WebSocketServer({server});

wss.on('connection',(sockets)=>{
  console.log("Socket is connected")

  console.log(sockets)
  sockets.on('message',(data,isBinary)=>{
    wss.clients.forEach((client)=>{
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    })
  })

  socket.close('connection',()=>{
    console.log("Socket is disconnected")
  })
})
app.use(express.json());

app.use(routes);


mongodb().then(()=>{
  server.listen(port, () => {
        console.log("Server is running on port", port);
      });
    })
    .catch(err => {
      console.log("DB connection failed", err);
    });
  
