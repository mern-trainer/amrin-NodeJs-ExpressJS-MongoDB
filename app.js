const { createServer } = require("http")
const { parse } = require("url")

const server = createServer()

server.on("request", (request, response) => {

    const path = parse(request.url)

    if (path.pathname === "/") {
        response.writeHead(201, { "content-type": "application/json" });
        response.write(JSON.stringify({ age: 30 }));
        return response.end()
    }

    if (path.pathname === "/api") {
        response.writeHead(201, {"content-type": "application/json"})
        response.write(JSON.stringify({ status: "Running", message: "Api calling" }));
        return response.end()
    }
})

server.listen(8080, (err) => {
    if (err) {
        return process.exit(1)
    }
    console.log("Server URL: http://localhost:8080")
})
