import WebSocket from 'ws';

const ws = new WebSocket('wss://api-jp.stork.network/prices-v3', {
    headers :{
        Authorization: '12c149dd-2521-4441-b073-e9a2ade86b12'
    }
});

//Example of subscribing to a single asset
// Source :
// https://docs.stork.network/hybrid-oracle-documentation


ws.on('open', function open() {
    ws.send('{"action":"set_signature", "type":"EVM"}');
    ws.send('{"action":"subscribe","assets":["SUIUSD"]}');
});

ws.on('message', function message(data) {
    console.log('received: %s', data);
});


ws.on('error', console.error);
