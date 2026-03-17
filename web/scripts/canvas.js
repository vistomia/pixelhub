const canvas = document.getElementById("map")
const mousePreview = document.getElementById("mouse-preview")

const ctx = canvas.getContext("2d")
const ctxM = mousePreview.getContext("2d")

const screen = document.getElementById("screen")

canvas.width = 1000;
canvas.height = 1000;
mousePreview.width = 1000;
mousePreview.height = 1000;

ctx.fillStyle = "rgb(100, 100, 20)"
ctx.fillRect(0,0,250,250)

ctx.imageSmoothingEnabled = false;
ctxM.imageSmoothingEnabled = false;

toolassist = {size: 10}

const panzoom = Panzoom(screen, {
    maxScale: 5,
    canvas: true,
    disablePan: true
  })



panzoom.pan(10, 10)
panzoom.zoom(3, { animate: true })
panzoom.pan(3, 3, { disablePan: true})
screen.parentElement.addEventListener('wheel', panzoom.zoomWithWheel)

function getMousePos(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: (event.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
        y: (event.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
    };
}


let painting = false // mover para a maioria da lógica das ferramentas para tools.js
let old = { x: 0, y: 0 };

screen.addEventListener('pointermove', function(event) {
    const mousePos = getMousePos(canvas, event);
    
    const size = toolassist.size;
    const gridPos = {
        x: mousePos.x - (mousePos.x % size),
        y: mousePos.y - (mousePos.y % size)
    };
    
    ctxM.clearRect(old.x, old.y, size, size);
    
    ctxM.fillStyle = "rgba(0,0,0,0.5)"
    ctxM.fillRect(gridPos.x, gridPos.y, size, size);
    
    if (painting) {
        ctx.fillStyle = "rgb(0,255,0)"
        ctx.fillRect(gridPos.x, gridPos.y, size, size);
    }

    old = gridPos;
});

screen.addEventListener("pointerdown", function(event) {    
    painting = true
    // TODO: função pintar na tools.js feedback local e envio para o servidor
    const mousePos = getMousePos(canvas, event); 
    
    const size = toolassist.size;
    const gridPos = {
        x: mousePos.x - (mousePos.x % size),
        y: mousePos.y - (mousePos.y % size)
    };
    
    if (painting) {
        ctx.fillStyle = "rgb(0,255,0)"
        ctx.fillRect(gridPos.x, gridPos.y, size, size);
    }
});

screen.addEventListener("pointerup", function(event) {    
    painting = false
});
