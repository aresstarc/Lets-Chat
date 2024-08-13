import mongoose from "mongoose"

const consversationSchema = new mongoose.Schema({
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message',
            default: []
        }
    ]
},{timestamps: true})

const Conversation = new mongoose.model("Conversation", consversationSchema)
export default Conversation 