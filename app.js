const express = require("express");
const http = require('http');
const cors = require("cors");
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

require("dotenv").config();

app.use(cors());
app.use(express.json());

app.get('/', (req, res, next) => {
    res.sendFile(__dirname + '/index.html');
});

io.on("connection", (socket) => {
    console.log("user is successfully connected...");
});

server.listen(process.env.PORT, () => {
    console.log(`Server is running at ${process.env.PORT}...`);
});