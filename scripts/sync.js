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