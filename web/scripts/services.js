const endpoint = "http://10.10.228.93:8080/auth"
const socket = new WebSocket("ws:10.10.228.93//:8080/ws")

let username = ""
var pixelsize = 0
var pixelbuffer = []
var pixelpaint = []

socket.onopen = () => {
    console.log("Entrou")
};

socket.onclose = () => {
    console.log('Desconectado do servidor.');
};

setInterval(() => {
    if (pixelsize >= 1) {
        for (send of pixelbuffer) {
            var payload = {
                type: "draw",
                user: username,
                start: {x: send[1], y: send[2]},
                end: {x: send[1], y: send[2]},
                color: send[0],
                lineWidth: 1
            }
            
            socket.send(JSON.stringify(payload))
        }
        pixelsize = 0
        pixelbuffer = []

        return
    }
}, 200)


function sendBucket(x, y, color) {
    var bucketPayload = {
        type: "bucket",
        user: username,
        start: {x: x, y: y},
        color: color
    }

    console.log(bucketPayload)

    socket.send(JSON.stringify(bucketPayload))
}

document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault(); 

    const usernameInput = document.getElementById('username').value;
    const submitButton = document.getElementById('submit-button');
    const modalLogin = document.getElementById('modal-login');

    if (usernameInput.length >= 15) {
        alert("O nome de usuário deve ser de no máximo 15 caracteres.")
        return
    }

    try {
        submitButton.disabled = true;
        submitButton.textContent = 'Entrando..';

        const response = await fetch(endpoint + '/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                username: usernameInput
            })
        });

        const data = await response.json();

        if (response.ok) {
            modalLogin.style.display = "none";
            document.getElementById("username-pill").textContent = usernameInput;
            startKeybind();
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Network or parsing error:', error);
        alert("Um erro inesperado ocorreu. Por favor, tente mais tarde.");
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Entrar';
    }
});
