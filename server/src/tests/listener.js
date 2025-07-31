import { io } from "socket.io-client";

const socket = io(`http://localhost:3000`);

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJha2FzaDEyMzQ1IiwidXNlcl9pZCI6IjY4OGIzZmFmMDkzNDM3OThmNTE5NjgxYyIsImlhdCI6MTc1Mzk2NjM5NywiZXhwIjoxNzUzOTY2OTk3fQ.HYtfr5wdXKIjPI1C3AriL-wU-PiZzjLd7Nmi04nNO2U";
socket.on("connect", () => {
  console.log("socket connected:", socket.id);
  socket.emit("auth", token);
});
socket.on("task:created", (task) => {
  console.log("User:B New task created in your project:", socket.id);
  console.log(task);
});
socket.on("task:update", (task) => {
  console.log("User[A]:  Task updated  in your project:", socket.id);
  console.log(task);
});
socket.on("task:delete", (task) => {
  console.log("User[A]:  Task deleted  in your project:", socket.id);
  console.log(task);
});
socket.on("user:joined", ({ userName }) => {
  console.log(`${userName} has joined`);
});
socket.on("user:left", ({ userName }) => {
  console.log(`${userName} has left`);
});
socket.on("user:typing", ({ userName }) => {
  console.log(userName);
  console.log(`✍️ ${userName} is typing...`);
});

socket.on("user:stopTyping", ({ userName }) => {
  console.log(`🛑 ${userName} stopped typing`);
});
socket.on("disconnect", () => {
  console.log("❌ Disconnected from socket");
});
