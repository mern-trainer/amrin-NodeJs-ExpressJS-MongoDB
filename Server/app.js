const express = require("express")
const todoRoute = require("./Routes/todo.route")
const userRoute = require("./Routes/user.route")
const cors = require("cors") // cross origin resource sharing
const jwtRoute = require("./Routes/jwt.route")
const connectDB = require("./Config/db.config")
const dbRoute = require("./Routes/db.route")

// jwt => json web token
// authentication and authorization

const app = express()

connectDB()

app.use(express.json())

app.use(cors({
    origin: "http://localhost:5173"
}))

app.use("/api/todo", todoRoute)
app.use("/api/users", userRoute)
app.use("/api/jwt", jwtRoute)
app.use("/api/db", dbRoute)

app.listen(8080, (err) => {
    if (err) {
        return process.exit(1)
    }
    console.log("Server running: http://localhost:8080/api");
})

