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

let count = 0;

io.on("connection", (socket) => {
    count++;
    let name = "user" + " " + count;
    io.emit('welcome message', `welcome user....`, `${name}`);

    console.log(name," is successfully connected...");

    socket.on('chat message', (msg) => {
        console.log('message from form = ', msg);
        io.emit('chat message', msg);
    })


    // socket.on('disconnect', (socket) => {
    //     console.log('user is successfully disconnected');
    // })
});

server.listen(process.env.PORT, () => {
    console.log(`Server is running at ${process.env.PORT}...`);
});