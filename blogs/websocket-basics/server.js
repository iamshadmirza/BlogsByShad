const http = require('http');
const websocket = require('ws');

const server = http.createServer((req, res) => {
    res.end("I am connected");
});
const wss = new websocket.Server({ server }); //created a web socket server listening to server at port 8000

wss.on('headers', (headers, req) => console.log(headers)); // receiving message from client from the header event

wss.on('connection', (ws, req) => {
    console.log(req);
    ws.send('This is a message from server');
    ws.on('message', (msg) => {
        console.log(msg);
    });
});
server.listen(8000);