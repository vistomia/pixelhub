const api_url = ""
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

document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault(); 

    const usernameInput = document.getElementById('username').value;
    const passwordInput = document.getElementById('password').value;
    const submitButton = document.querySelector('.form-field button');

    try {
        submitButton.disabled = true;
        submitButton.textContent = 'Logging in...';

        const response = await fetch( api_url + '/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                username: usernameInput, 
                password: passwordInput
            })
        });

        const data = await response.json();

        if (response.ok) {
            // JWT
            const token = data.token; 
            localStorage.setItem('auth_token', token);            
        } else {
            alert(`Login failed: ${data.error || 'Please check your credentials.'}`);
        }
    } catch (error) {
        console.error('Network or parsing error:', error);
        alert('An error occurred while trying to log in. Please try again later.');
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Entrar';
    }
});