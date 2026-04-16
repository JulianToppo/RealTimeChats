
const rooms = new Map();

const joinRoom = (roomId, ws) => {
  if (!rooms.has(roomId)) rooms.set(roomId, new Set());
  rooms.get(roomId).add(ws);
  ws.roomId = roomId;


  console.log(rooms);
};

const broadcastToRoom = (roomId, data) => {

  const room = rooms.get(roomId);
  
  console.log(rooms.size ,data)
  if (!room) return;

    
  for (const client of room) {
    // console.log(client);
    if (client.readyState === 1) {
      client.send(JSON.stringify(data));
    }
  }
};

module.exports = {
  joinRoom,
  broadcastToRoom,
};