import path from 'path'
import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import authRoutes from "./routes/authRoutes.js"
import messageRoutes from "./routes/messageRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import mongoose from "mongoose"
import { app, server } from "./socket/socket.js"


dotenv.config()

app.use(express.json())
app.use(cookieParser())

const PORT = process.env.PORT || 3000

const __dirname = path.resolve()
mongoose.connect(process.env.MONGO_DB_URL)

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', ()=>{
    console.log('Mongo DB ATLAS connected')
})


server.listen(PORT, ()=>{
    console.log(`connected to port ${PORT}`)
})

app.use("/api/auth", authRoutes)
app.use("/api/message", messageRoutes)
app.use("/api/user", userRoutes)

app.use(express.static(path.join(__dirname,'/client/dist')))

app.get("*" , (req,res)=>{
    res.sendFile(path.join(__dirname, "client" , "dist", "index.html"))
})