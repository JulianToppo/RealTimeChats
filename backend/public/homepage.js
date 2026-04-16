const socket = new WebSocket("ws://localhost:3000");

// connection open
socket.onopen = () => {
    console.log("Connected to server");
    
    // send message to server
    socket.send(JSON.stringify({
        type: "message",
        text: "Hello from client"
    }));
};

// receive message from server
socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log("Message from server:", data);
};

// connection closed
socket.onclose = () => {
    console.log("Disconnected from server");
};

// error handling
socket.onerror = (error) => {
    console.error("WebSocket error:", error);
};