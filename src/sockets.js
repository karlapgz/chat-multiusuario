module.exports = function(io) {

    let nicknames = [];
    console.log(nicknames)

    io.on('connection', socket => {
        console.log('nuevo usuario conectado');

        socket.on('new user', (data, cb) => {
            if(nicknames.indexOf(data) !== -1) {
                cb(false);
            } else {
                cb(true);
                socket.nickname = data;
                nicknames.push(socket.nickname);
                updateNicknames();
            }
            console.log(nicknames)
        });
        
        socket.on('send message', function (data) {
            io.sockets.emit('new message', {
                msg: data,
                nick: socket.nickname
            });
        })

        socket.on('disconnect', function (data){
            
            if(!socket.nickname) return;
            nicknames.splice(nicknames.indexOf(socket.nickname), 1)
            updateNicknames();
        })

        function updateNicknames() {
            io.sockets.emit('usernames', nicknames);
        }

    });
}
