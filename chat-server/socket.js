const SocketIO = require('socket.io');


module.exports = (server)=>{
    const io = SocketIO(server);
    io.on('connection', (socket) => {
        socket.on('chat message', (msg) => {
            io.emit('chat message', msg);
          });
      });
}