$(function () {
    const socket = io();

    const messageForm = $('#message-form'),
        messageBox = $('#message'),
        chat = $('#chat');

    // elementos del nicknameForm
    const nickForm = $('#nickForm'),
        nickName = $('#nickName'),
        nickError = $('#nickError');

        console.log("nickname=", nickName);

    const users = $('#usernames');
    
    nickForm.submit(e => {
        e.preventDefault();
        socket.emit('new user', nickName.val(), (data) => {
            if(data) {
                $('#nickWrap').hide();
                $('#contentWrap').show();
            } else {
                nickError.html(`
                    <div class="alert alert-danger">
                        Ese usuario ya existe.
                    </div>
                `)
            }
            nickName.val('');
        });
    })

    messageForm.submit((e) => {
        e.preventDefault();
        socket.emit('send message', messageBox.val());
        messageBox.val('');
    });

    socket.on('new message', function (data) {
        chat.append('<b>' + data.nick + '</b>: ' + data.msg + '<br/>');
    })

    socket.on("usernames", function (data) {
        let html = '';
        for(let i = 0; i < data.length; i++) {
            html += `<p><i class="fas fa-user"></i>${data[i]}</p>`
        }
        users.html(html);
    })
})