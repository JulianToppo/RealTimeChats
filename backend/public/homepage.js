const socket = new WebSocket("ws://localhost:3000");
let username=prompt("Please enter your name");
let currentRoom = null;

// when connection opens
socket.onopen = () => {
  console.log("Connected to server");
};

// receive messages from server
socket.onmessage = (event) => {
  const data = JSON.parse(event.data);

  console.log(data);

  if (data.type === "NEW_MESSAGE") {
    showMessage(data.data);
  }
};

// join room
function joinRoom() {
  const roomId = document.getElementById("roomInput").value;
  currentRoom = roomId;

  socket.send(JSON.stringify({
    type: "join-room",
    roomId,
    username,
  }));

  showMessage(`Joined room: ${roomId}`);
  loadMessages(roomId);
}


async function loadMessages(roomId) {
  const res = await axios.get("http://localhost:3000"+`/messages/${roomId}`);
  const messages = await res.data;

  messages.forEach(msg => {
    console.log(msg);
    showMessage(msg.username+':' +msg.message);
  });
}

// send message
function sendMessage() {
  const message = document.getElementById("msgInput").value;

  if (!currentRoom) {
    alert("Join a room first");
    return;
  }

  socket.send(JSON.stringify({
    type: "message",
    data:{
        message:message,
        roomID:currentRoom,
        username:username
    }
  }));

  document.getElementById("msgInput").value = "";
}

// show message in UI
function showMessage(msg) {
  const chatBox = document.getElementById("chatBox");

  const div = document.createElement("div");
  div.className = "msg";
  div.innerText = msg;

  
  if(m)

  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}