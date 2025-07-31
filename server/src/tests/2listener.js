import { io } from "socket.io-client";

const socket = io(`http://localhost:3000`);

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJha2FzaDEyMzQiLCJ1c2VyX2lkIjoiNjg4YjNmYTAwOTM0Mzc5OGY1MTk2ODE4IiwiaWF0IjoxNzUzOTY2NDE2LCJleHAiOjE3NTM5NjcwMTZ9.lc_UraJgVs0RpDQPqDuJ-rPNTrogEGqG0G4qFVXlteY";
const projectId = "688b400009343798f5196823";
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
socket.on("user:typing", ({ userId }) => {
  console.log(`✍️ ${userId} is typing...`);
});

socket.on("user:stopTyping", ({ userId }) => {
  console.log(`🛑 ${userId} stopped typing`);
});
function simulateTyping() {
  console.log("⌨️ Simulating typing...");
  socket.emit("typing", { projectId });

  setTimeout(() => {
    socket.emit("stopTyping", { projectId });
    console.log("⌨️ Typing stopped");
  }, 2000);
}

socket.on("disconnect", () => {
  console.log("❌ Disconnected from socket");
});
setInterval(simulateTyping, 5000);
