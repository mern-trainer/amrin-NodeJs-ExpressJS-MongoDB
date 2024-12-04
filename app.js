const { createServer } = require("http")
const { parse } = require("url")

const server = createServer()

let todoList = []

server.on("request", (request, response) => {

    const { pathname, query } = parse(request.url, true)
    const method = request.method

    if (pathname == "/api/todo/create" && method == "GET") {
        const { title } = query
        if (!title) {
            response.writeHead(400, { "content-type": "application/json" });
            return response.end(JSON.stringify({status: "Not OK", message: "Title is required!"}))
        }
        todoList.push(title)
        response.writeHead(201, { "content-type": "application/json" });
        return response.end(JSON.stringify({status: "OK", message: "Created!"}))
    }

    if (pathname == "/api/todo" && method == "GET") {
        response.writeHead(200, { "content-type": "application/json" });
        return response.end(JSON.stringify(todoList))
    }

    if (pathname == "/api/todo/update" && method == "GET") {
        const { title, index } = query
        const item = todoList[index]
        todoList[index] = title
        response.writeHead(201, { "content-type": "application/json" });
        return response.end(JSON.stringify({message: `${item} updated to ${title}`}))
    }

    if (pathname == "/api/todo" && method == "DELETE") {
        const { index } = query
        todoList.splice(index, 1)
        response.writeHead(200, { "content-type": "application/json" });
        return response.end(JSON.stringify({status: "OK", message: "Task removed"}))
    }

})

server.listen(8080, (err) => {
    if (err) {
        return process.exit(1)
    }
    console.log("Server URL: http://localhost:8080")
})
