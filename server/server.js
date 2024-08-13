import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import authRoutes from "./routes/authRoutes.js"
import messageRoutes from "./routes/messageRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import mongoose from "mongoose"

const app = express()
dotenv.config()

app.use(express.json())
app.use(cookieParser())

const PORT = process.env.PORT || 3000
mongoose.connect(process.env.MONGO_DB_URL)

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', ()=>{
    console.log('Mongo DB ATLAS connected')
})


app.listen(PORT, ()=>{
    console.log(`connected to port ${PORT}`)
})

app.use("/api/auth", authRoutes)
app.use("/api/message", messageRoutes)
app.use("/api/user", userRoutes)