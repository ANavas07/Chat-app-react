import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiverID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message:{
        type: String,
        required: true
    },
    //this field create the time when the message was sent and the time when the message was updated
}, {timestamps: true});

const Message = mongoose.model('Message', messageSchema);
export default Message;