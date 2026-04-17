const { WebSocketServer } = require("ws");
const { joinRoom, typingIndicator } = require("./wsService");
const { sendMessage } = require("../controller/crudcontroller");

const creatingWebSocketConnection = (server) => {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws) => {
    console.log("connection is created");
    ws.on("message", (msg) => {
      const data = JSON.parse(msg.toString());

      if (data.type === "join-room") {
        let userData= {
          roomId:data.roomId,
          username:data.username
        }
        joinRoom(userData, ws);
      }else {
        if(data.type ==="message"){
          console.log("message event triggered in the backend")
            sendMessage(data.data)
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