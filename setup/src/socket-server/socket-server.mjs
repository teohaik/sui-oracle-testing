import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

console.log("Simple WebSocket Server Started");
console.log("Waiting for client to connect");

wss.on('connection', async function connection(ws) {

    ws.on('error', console.error);

    ws.on('message', function message(data) {
        console.log('received: %s', data);
    });

    for (let i = 0; i < 10000; i++) {
        ws.send("" + i);
        console.log('Sending number.... '+ i );
        await new Promise(r => setTimeout(r, 2000));
    }
});