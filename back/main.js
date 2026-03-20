require("dotenv").config()
const WebSocket = require("ws")

const wss = new WebSocket.Server({
    port: process.env.PORT
})

function broadcast() {
    
}

function onMessage(ws, data) {
    console.log("olá")
    console.log(data.toString())
}

function onConnection(ws, req) {
    ws.on("message", data => onMessage(ws, data))
}

wss.on("connection", onConnection)
