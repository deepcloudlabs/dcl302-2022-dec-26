const io = require("socket.io-client");
const client = io.connect("http://localhost:8200");
client.on("connect", () => {
    console.log("Connected to the websocket server (http://localhost:8200).");
    client.on("hr-events", event => {
        console.log(event.toString());
    });
})