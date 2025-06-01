require("dotenv").config();
const express = require("express");
const path = require("path");
const db = require("./db/queries");

const app = express();

// static assets from public folder
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

//set up ejs and views
const viewsPath = path.join(__dirname, "views");
app.set("views", viewsPath);
app.set("view engine", "ejs");

// parse url encoded data
app.use(express.urlencoded({ extended: true }));

// rutas
app.get("/", async (req, res) => {
  try {
    const messages = await db.getAllMessages();
    res.render("index", {
      title: "Message board",
      messages: messages,
    });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).send("Error fetching messages");
  }
});

app.get("/new", (req, res) => {
  res.render("form", { title: "New message" });
});

app.post("/new", async (req, res) => {
  try {
    const { messageUser, messageText } = req.body;
    await db.insertMessage(messageUser, messageText);
    res.redirect("/");
  } catch (error) {
    console.error("Error saving message:", error);
    res.status(500).send("Error saving message");
  }
});

app.get("/message/:id", async (req, res) => {
  try {
    const message = await db.getMessageById(req.params.id);
    if (!message) {
      return res.status(404).send("Message not found");
    }
    res.render("detail", {
      title: "Message Detail",
      message: message,
    });
  } catch (error) {
    console.error("Error fetching message:", error);
    res.status(500).send("Error fetching message");
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(
    `Server running on port ${port} and url: http://localhost:${port}`
  );
});
