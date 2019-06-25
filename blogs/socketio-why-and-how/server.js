const http = require('http');
const socketio = require('socket.io');

const server = http.createServer((req, res) => {
    res.end("I am connected");
});
const io = new socketio(server);

io.on('connection', (socket, req) => {
    socket.emit('messageFromServer', 'This is a message from server');
    socket.on('messageFromClient', (msg) => {
        console.log(msg);
    });
});
server.listen(8000);