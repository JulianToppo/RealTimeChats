const express = require("express");
const path = require("path");
const routes = require("./routes/routes");
const mongodb = require("./utils/db");
const db = require("./utils/db");
const { WebSocket, WebSocketServer } = require("ws");
const http = require("http");
const { creatingWebSocketConnection } = require("./utils/websockets");
const app = express();

app.use(express.urlencoded({ extended: "true" }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
const port = 3000;

const server = http.createServer(app);
const wss = creatingWebSocketConnection(server);

app.set("wss", wss);

app.use(routes);

mongodb()
  .then(() => {
    server.listen(port, () => {
      console.log("Server is running on port", port);
    });
  })
  .catch((err) => {
    console.log("DB connection failed", err);
  });
