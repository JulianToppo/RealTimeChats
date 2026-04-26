
const rooms = new Map();

const joinRoom = (userData, ws) => {

  const{username,roomId}=userData;
  if (!rooms.has(roomId)) rooms.set(roomId, new Set());
  rooms.get(roomId).add(ws);
  ws.roomId = roomId;
  ws.username=username;


  console.log(rooms);
};

const broadcastToRoom = (ws, data) => {
  console.log("broadcast to rooms called")
  const room = rooms.get(ws.roomId);
  
  console.log(rooms.size ,data)
  if (!room) return;

    
  for (const client of room) {
    // console.log(client);
    if (client.readyState === 1) {
      client.send(JSON.stringify({type:"message",data:data}));
    }
  }
};

const typingIndicator=(ws,data)=>{
  const { roomId, username, isTyping } = data;
  const clients = rooms.get(ws.roomId) || [];

  console.log(clients,roomId,username ,isTyping);
  clients?.forEach((client) => {
    if (
      client !== ws
    ) {
      client.send(
        JSON.stringify({
          type: "typing",
         data:{
          username:username,
          isTyping:isTyping
         }
        })
      );
    }
  });
}

const broadcastToAll = (data) => {
  
  const broadcastToAll = (data) => {
    for (const room of rooms.values()) {
      for (const client of room) {
        if (client.readyState === 1) {
          client.send(JSON.stringify({type:"new-group",...data}));
        }
      }
    }
  };
  
};

const disconnectUserConnections= (ws,roomId)=>{
  if (roomId && rooms.has(roomId)) {
    const clients = rooms.get(roomId);
    clients.delete(ws); 

    if (clients.size === 0) {
      rooms.delete(roomId);
    }
  }
};

module.exports = {
  joinRoom,
  broadcastToRoom,
  typingIndicator,
  broadcastToAll,
  disconnectUserConnections
};