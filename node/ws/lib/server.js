var WebSocketServer = require('ws').Server
var wss = new WebSocketServer({
    port: 8025,
    path: '/websockets/TelemaSimController'
});

wss.on('connection', function(ws){
  ws.on('message', function(message){
    console.log('received: %s', message);
  });
});
