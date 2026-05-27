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
            const x = Math.floor(data.start.x);
            const y = Math.floor(data.start.y);
            const size = Math.max(1, Math.floor(data.size ?? 1));

            ctx.fillStyle = data.color;
            ctx.fillRect(x, y, size, size);
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