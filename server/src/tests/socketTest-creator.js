import { io } from "socket.io-client";

const socket = io(`http://localhost:3000`);

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJha2FzaDEyMyIsInVzZXJfaWQiOiI2ODg2MTcwZmY0MTYxMTJmMDY5ZjA5ODEiLCJpYXQiOjE3NTM5NjYzNzEsImV4cCI6MTc1Mzk2Njk3MX0.gxiZWmd_PVxtKNuN6fopQuTKv-Nsgm7gtGiqcc9wjb0";
socket.on("connect", () => {
  console.log("socket connected:", socket.id);
  socket.emit("auth", token);
});
socket.on("task:created", (task) => {
  console.log("User[A]: New task created in your project:", socket.id);
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
  console.log(`✍️ ${userName} is typing...`);
});

socket.on("user:stopTyping", ({ userName }) => {
  console.log(`🛑 ${userName} stopped typing`);
});
socket.on("disconnect", () => {
  console.log("❌ Disconnected from socket");
});
