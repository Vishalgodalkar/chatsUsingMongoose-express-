const express = require("express");
const app = express();
const path = require("path");
const Chat = require("./models/chat.js");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

main()
  .then(() => {
    console.log("Connection Successful");
  })
  .catch((err) => console.log(err));

// let chat1 = new Chat({
//   from: "neha",
//   to: "priya",
//   msg: "Send your exam sheets",
//   created_at: new Date(),
// });

// chat1.save().then((res) => {
//   console.log(res);
// });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

//Index Route
app.get("/chats", async (req, res) => {
  let chats = await Chat.find();
  console.log(chats);
  // res.send("Working");
  res.render("index.ejs", { chats });
});

//new chat
app.post("/chats", (req, res) => {
  let { from, to, msg } = req.body;
  let newChat = new Chat({
    from: from,
    msg: msg,
    to: to,
    created_at: new Date(),
  });
  // console.log(newChat);
  newChat
    .save()
    .then((res) => {
      console.log("Chat is saved");
    })
    .catch((err) => {
      console.log(err);
    });
  res.redirect("/chats");
});

//Edit route
app.get("/chats/:id/edit", async (req, res) => {
  let { id } = req.params;
  let chat = await Chat.findById(id);
  res.render("edit.ejs", { chat });
});

//Update Rout
app.put("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let { msg :newMsg } = req.body;
  let newChat = await Chat.findByIdAndUpdate(
    id,
    { msg: newMsg },
    { runValidators: true, new: true }
  );
  console.log(newChat); 
  res.redirect("/chats");
});

app.get("/chats/new", (req, res) => {
  res.render("new.ejs");
});

app.get("/", (req, res) => {
  res.send("Root is worrking");
});

app.listen(8080, () => {
  console.log("Sereer is litening on port on 8080");
});
