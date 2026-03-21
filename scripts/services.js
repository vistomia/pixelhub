const socket = new WebSocket("ws://localhost:3001")

var pixelsize = 0
var pixelbuffer = []

socket.onopen = () => {
    socket.send(JSON.stringify(pixelbuffer));
};

setInterval(() => {
    if (pixelsize >= 1) {
        socket.send(JSON.stringify(pixelbuffer))
        pixelsize = 0
        pixelbuffer = []
        return
    }
}, 200)