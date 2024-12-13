const express = require("express")
const todoRoute = require("./Routes/todo.route")
const userRoute = require("./Routes/user.route")

const app = express()

app.use(express.json())

app.use("/api/todo", todoRoute)
app.use("/api/users", userRoute)

app.listen(8080, (err) => {
    if (err) {
        return process.exit(1)
    }
    console.log("Server running: http://localhost:8080/api");
})

