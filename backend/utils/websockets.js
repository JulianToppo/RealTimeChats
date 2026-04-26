const { WebSocketServer } = require("ws");
const { joinRoom, typingIndicator, broadcastToRoom } = require("./wsService");
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
          const {isTyping}=data;
        typingIndicator(ws,isTyping);
      }
    }
  }

    });
  });

  return wss;
};

module.exports = { creatingWebSocketConnection };