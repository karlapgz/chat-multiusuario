const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.set('port', process.env.PORT || 3000)

require('./sockets')(io);

// mandando archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));

// iniciando el servidor
server.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
})