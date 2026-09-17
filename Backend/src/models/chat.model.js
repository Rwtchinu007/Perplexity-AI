import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
user:{
    type: mongoose.Schema.Types.ObjectId, //this will store the id of the user who created the chat, and it will reference the User model, which is why we use ref: "User". This allows us to populate the user field with the actual user document when we query for chats.
    ref: "User",
    required: true,
},
title:{
type: String,
default: "New Chat",
trim: true,
},
},{timestamps: true});

const chatModel = mongoose.model("Chat", chatSchema);

export default chatModel;