import { app } from "./app.js";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { handleSocketConnections } from "./sockets/socketHandler.js";

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: "*",
  },
});

app.set("io", io);
const PORT = process.env.PORT;
io.on("connection", (socket) => {
  handleSocketConnections(socket, io);
});
server.listen(PORT, () => {
  console.log("Listening on PORT:", PORT);
});
