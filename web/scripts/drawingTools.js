class PixelApp {
    constructor() {
        this.colorSlot = 0
        this.color = ["rgb(0,0,0)", "rgb(255,255,255)"]
        this.size = 10
        this.tool = null
    }

    changeColor(color) {
        this.color[this.colorSlot] = color
    }

    setTool(tool) {
        this.tool = tool
    }

    useTool(canvas, x, y, x1, y2) {
        this.tool.use(canvas, x, y, x1, y2)
    }
}
