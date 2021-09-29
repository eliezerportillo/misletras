const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 5000;

io.on('connection', (socket) => {

    const idHandShake = socket.id;
    const { stage } = socket.handshake.query;
    console.log(`Hola dispositivo: ${idHandShake} --> Stage: ${stage}`);
    socket.join(stage);
    socket.on('event', (res) => {
        console.log(res);
        socket.to(stage).emit('event', res);
    });
    // socket.on('disconnect', (res)=> {

    // });
});

server.listen(port, () => {
    console.log(`listening on ${port}`);
});