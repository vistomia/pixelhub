class PixelApp {
    constructor() {
        this.colorSlot = 0
        this.color = ["rgb(0,0,0)", "rgb(255,255,255)"]
        this.tool = null
    }

    setColor(color) {
        this.color[this.colorSlot] = color
    }

    setTool(tool) {
        this.tool = tool
    }

    useTool(x, y, x1, y2) {
        this.tool.use(this.color, x, y, x1, y2)
    }
}


class Pencil {
    constructor(ctx) {
        this.size = 10
        this.ctx = ctx
    }

    use(color, x, y, x1, y2) {
        this.ctx.fillStyle = color[0]
        this.ctx.fillRect(x, y, this.size, this.size);
    }

    changeSize(size) {
        this.size = size
    }
}

class Eraser {
    constructor(ctx) {
        this.size = 10
        this.ctx = ctx
    }

    use(color, x, y, x1, y2) {
        this.ctx.fillStyle = color[1]
        this.ctx.fillRect(x, y, this.size, this.size);
    }

    changeSize(size) {
        this.size = size
    }
}

class Pan {
    constructor(ctx) {
        this.size = 10
        this.ctx = ctx
    }

    use(color, x, y, x1, y2) {

    }
}
