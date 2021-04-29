const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/html/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    socket.broadcast.emit('chat disconnect');
  });

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

server.listen(3000, () => {
  console.log('listening on port: 3000');
});
