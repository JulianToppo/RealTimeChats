const socket = new WebSocket("ws://localhost:3000");

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
    roomId
  }));

  showMessage(`Joined room: ${roomId}`);
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
        roomID:currentRoom
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

  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}