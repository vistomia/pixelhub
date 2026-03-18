






const canvas = document.getElementById("map")
const mousePreview = document.getElementById("mouse-preview")
const color1 = document.getElementById("color-1")
const color2 = document.getElementById("color-1")

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

pixelapp = new PixelApp()

const pencil = new Pencil(ctx)
const eraser = new Eraser(ctx)
const pan = new Pan(ctx)

pixelapp.setTool(pencil)

color1.addEventListener("input", ()=>{
    console.log("teste")
    pixelapp.setColor(color1.value)
})

const panzoom = Panzoom(screen, {
        maxScale: 5,
        canvas: true,
        disablePan: true
    })

panzoom.pan(10, 10)
panzoom.zoom(3, { animate: true })

function setPencil() {
    panzoom.setOptions({ disablePan: true })
    pixelapp.setTool(pencil)
}

function setEraser() {
    panzoom.setOptions({ disablePan: true })
    pixelapp.setTool(eraser)
}

function setPan() {
    panzoom.setOptions({ disablePan: false })
    pixelapp.setTool(pan)
}

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
        pixelapp.useTool(gridPos.x, gridPos.y, 0, 0)
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
    
    pixelapp.useTool(gridPos.x, gridPos.y, 0, 0)
});

screen.addEventListener("pointerup", function(event) {    
    painting = false
});
