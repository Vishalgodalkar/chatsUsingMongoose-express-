const Chat = require("./models/chat.js");
const mongoose = require("mongoose");

main()
  .then(() => {
    console.log("Connection Successful");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

let allChats = [
  {
    from: "neha",
    to: "priya",
    msg: "Send your exam sheets",
    created_at: new Date(),
  },
  {
    from: "vishal",
    to: "sujal",
    msg: "Send your photo",
    created_at: new Date(),
  },
  {
    from: "om",
    to: "rohit",
    msg: "Please bring your math notes",
    created_at: new Date(),
  },
  {
    from: "ketki",
    to: "ruchita",
    msg: "How are you !!",
    created_at: new Date(),
  },
  {
    from: "pritam",
    to: "komal",
    msg: "Happy Birthday",
    created_at: new Date(),
  },
];

Chat.insertMany(allChats);

