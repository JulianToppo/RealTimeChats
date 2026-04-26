const { WebSocketServer } = require("ws");
const { joinRoom, typingIndicator, broadcastToRoom, disconnectUserConnections } = require("./wsService");
const { sendMessage } = require("../controller/crudcontroller");

const creatingWebSocketConnection = (server) => {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws) => {
    console.log("connection is created");
    ws.on("message", (msg) => {
      
      const data = JSON.parse(msg.toString());
      

      if (data.type === "join-room") {
        console.log("Join room called")
        // console.log(data.roomId)
        // let userData= {
        //   roomId:data.data.roomId,
        //   username:data.data.username
        // }
        joinRoom(data.data, ws);
      }else {
        if(data.type ==="message"){
          console.log("message event triggered in the backend",data.data)
            broadcastToRoom(ws,data.data)
        }
      else {
        if(data.type=="typing"){
          console.log("this is being triggered")
          
        typingIndicator(ws,data.data);
      }
    }
  }

    });

    ws.on("close", () => {
      
      if(ws.roomId ){
        console.log("user disconnected", ws.username);
        disconnectUserConnections(ws,ws.roomId);
      }
      
    })




  });

  return wss;
};

module.exports = { creatingWebSocketConnection };