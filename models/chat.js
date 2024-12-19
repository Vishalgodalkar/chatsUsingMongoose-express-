const mongoose = require("mongoose");

// Define the schema
const chatSchema = new mongoose.Schema({
    from: {
        type: String,
        required: true // Fix: Changed 'require' to 'required'
    },
    to: {
        type: String
    },
    msg: {
        type: String,
        maxLength: 50 // Maximum length of the message
    },
    created_at: {
        type: Date,
        default: Date.now // Default value for created_at
    }
});

// Create the model
const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
