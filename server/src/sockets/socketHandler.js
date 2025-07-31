import jwt from "jsonwebtoken";
import { getAllProjects } from "../services/projectServices.js";
import AppError from "../utils/AppError.js";
const activeUsersPerProject = {}; // this is used to store how many people are active in a current project but right now we are not implementing it.This is a set(ex: projectA  : set(userA,userB,userC))

export function handleSocketConnections(socket, io) {
  console.log("Socket Connected:", socket.id);
  socket.on("auth", async (token) => {
    try {
      const decoded = jwt.verify(token, process.env.JWT_ACCESS_KEY);
      // console.log(decoded);
      // socket;
      const projects = await getAllProjects({ User: decoded.user_id });
      socket.userId = decoded.user_id;
      socket.userName = decoded.user_name;
      console.log(socket.userName);
      socket.projects = [];
      projects.forEach((project) => {
        const room = `project:${project._id}`;
        socket.join(room);
        socket.projects.push(room);
        console.log(`successfully joined Room with  projectId:${project._id}`);
        //to track who is online
        if (!activeUsersPerProject[room]) {
          activeUsersPerProject[room] = new Set();
        }
        activeUsersPerProject[room].add(socket.userId);
        //too let people in the same room know he is joined
        socket.to(room).emit("user:joined", { userName: socket.userName });
      });
    } catch (error) {
      console.log(
        "Socket Connection Failed for socketId:",
        socket.id,
        error.message
      );
      socket.disconnect();
    }
    socket.on("typing", ({ projectId }) => {
      const room = `project:${projectId}`;
      console.log("inside typing", socket.userName);
      socket.to(room).emit("user:typing", { userName: socket.userName });
    });

    socket.on("stopTyping", ({ projectId }) => {
      const room = `project:${projectId}`;
      socket.to(room).emit("user:stopTyping", { userName: socket.userName });
    });

    socket.on("disconnect", () => {
      console.log("socket disconnected:", socket.id);
      if (socket.projects && socket.userId) {
        socket.projects.forEach((room) => {
          activeUsersPerProject[room]?.delete(socket.userId);
          socket.to(room).emit("user:left", { userName: socket.userName });
        });
      }
    });
  });
}
