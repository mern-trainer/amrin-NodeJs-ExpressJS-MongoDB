const express = require("express")
const todoRoute = require("./Routes/todo.route")

const app = express()

app.use(express.json()) // application middleware

app.use("/api", todoRoute)  // versions

app.listen(8080, (err) => {
    if (err) {
        return process.exit(1)
    }
    console.log("Server running: http://localhost:8080/api");
})

