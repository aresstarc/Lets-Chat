import { Server } from "socket.io";
import {createServer} from 'http'
import express from 'express'

const app = express()

const server = createServer(app)
const io = new Server(server,{
    cors: {
        origin: ["http://localhost:5173"],
        methods: ["GET","POST"]
    }
})

export const getReceiverSocketId = (receiverId)=>{
    return userSocketMap[receiverId]
}

const userSocketMap = {} // here will be object of{userId: socketId }

io.on("connection",(socket)=>{
    console.log("a user conncted ",socket.id)

    const userId = socket.handshake.query.userId
    if(userId != "undefined") userSocketMap[userId] = socket.id

    io.emit("getOnlineUsers", Object.keys(userSocketMap))

    socket.on("disconnect", ()=>{
        console.log("disconnected", socket.id)
        delete userSocketMap[userId]
        io.emit("getOnlineUsers", Object.keys(userSocketMap))
    })
    
})


export {app, io , server}