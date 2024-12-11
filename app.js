const express = require("express")
const todoRoute = require("./Routes/todo.route")

const app = express()

app.use(express.json())

// middleware

app.use((req, res, next) => {
    const startTime = new Date().getTime()
    const { method, url: path } = req
    res.on("finish", () => {
        const endTime = new Date().getTime()
        console.log(`${method} ${path} - ${res.statusCode} - ${endTime - startTime} --ms`)
    })
    next()
})

app.use("/api", todoRoute) 

app.listen(8080, (err) => {
    if (err) {
        return process.exit(1)
    }
    console.log("Server running: http://localhost:8080/todo");
})

