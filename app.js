const express = require("express")
const todoRoute = require("./Routes/todo.route")
const loggerMid = require("./Middleware/logger")

const app = express()

app.use(express.json())

app.use("/api", todoRoute) 

app.listen(8080, (err) => {
    if (err) {
        return process.exit(1)
    }
    console.log("Server running: http://localhost:8080/todo");
})

