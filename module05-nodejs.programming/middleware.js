const http = require("http");

const {drawMultiple} = require("./lottery")

http.createServer(function (req, res) {
    req.on("data", (reqBody)=>{ // non-blocking
        const body = JSON.parse(reqBody.toString());
        res.writeHead(200, {"Content-Type": "application/json"});
        res.write(JSON.stringify(drawMultiple(body.max,body.size,body.column)));
        res.end();
    })
}).listen(7100);
console.log("Server is running at 7100...")