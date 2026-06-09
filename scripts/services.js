let ip = "";

let username = ""
var pixelsize = 0
var pixelbuffer = []
var pixelpaint = []

function startWS(endpoint) {
    let socket = new WebSocket(endpoint)
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

    socket.onmessage = (event) => {
        try {
            const data = JSON.parse(event.data);
    
            if (data.type === 'users') {
                out = "Pessoas online agora: "
                for (user of data.users) {
                    out += user.username
                }
    
                document.getElementsByClassName("number-users")[0].style.display = "block"
                document.getElementById("number-of-users").textContent = data.users.length
            }
            if (data.type === 'draw') {
                const x0 = Math.floor(data.start.x);
                const y0 = Math.floor(data.start.y);
                const x1 = Math.floor((data.end ?? data.start).x);
                const y1 = Math.floor((data.end ?? data.start).y);
                const size = Math.max(1, Math.floor(data.size ?? 1));
    
                const dx = Math.abs(x1 - x0);
                const dy = Math.abs(y1 - y0);
                const sx = x0 < x1 ? 1 : -1;
                const sy = y0 < y1 ? 1 : -1;
    
                let x = x0;
                let y = y0;
                let err = dx - dy;
    
                ctx.fillStyle = data.color;
    
                while (true) {
                    ctx.fillRect(x, y, size, size);
    
                    if (x === x1 && y === y1) break;
    
                    const e2 = 2 * err;
                    if (e2 > -dy) {
                        err -= dy;
                        x += sx;
                    }
                    if (e2 < dx) {
                        err += dx;
                        y += sy;
                    }
                }
            }
            if (data.type === 'board') {
                const colors = data.art;
                const boardWidth = 1000; 
    
                for (let i = 0; i < colors.length; i++) {
                    const x = i % boardWidth;
                    const y = Math.floor(i / boardWidth);
    
                    ctx.fillStyle = colors[i];
                    ctx.fillRect(x, y, 1, 1);
                }
            }
        } catch (err) {
            console.error('Erro ao ler a mensagem:', err);
        }       
    };
}

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

    const IPinput = document.getElementById('ip').value;
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

        const response = await fetch(`http://${IPinput}:8080/auth/login`, {
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
            startWS(`ws://${IPinput}:8080/ws`)
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
