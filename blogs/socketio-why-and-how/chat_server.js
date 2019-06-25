const express = require('express');
const app = express();
const socketio = require('socket.io');

app.use(express.static(__dirname + '/public'));

const expressServer = app.listen(8000);

const io = new socketio(expressServer);

io.on('connection', (socket, req) => {
    socket.emit('messageFromServer', 'Connection established successfully!');
    socket.on('messageFromClient', (msg) => {
        console.log(msg);
    });
    socket.on('newMessageToServer', (msg) => {
        console.log(msg)
        socket.emit('newMessageToClient', { text: msg.text });
    })
});