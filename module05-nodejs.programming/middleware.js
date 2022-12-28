const http = require("http");

const {drawMultiple, draw} = require("./lottery")
// curl -X POST "http://localhost:7100/lottery" -d "{\"max\": 60, \"size\": 6, \"column\": 10}"
http.createServer(function (req, res) {
    req.on("data", (reqBody) => { // non-blocking
        const body = JSON.parse(reqBody.toString());
        res.writeHead(200, {"Content-Type": "application/json"});
        res.write(JSON.stringify(drawMultiple(body.max, body.size, body.column)));
        console.log(draw(body.max, body.size))
        res.end();
    })
}).listen(7100);
console.log("Server is running at 7100...")