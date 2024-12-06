// NodeJS => Framework

// NodeJS =>
    
// Routing => Routing issues
// req, res => there is no middleware support

// /api/3981

// ExpressJS =>

// Easy Routing
// Middleware support => authentication and authorization
// response, request

const express = require("express")

const app = express()

app.use(express.json())

app.get("/:id?/:uid?", (request, response) => {
    const { id, uid } = request.params
    const query = request.query
    if (!id) {
        return response.status(400).send({ message: "Id is required!" });
    }
    if (!uid) {
        return response.status(400).send({ message: "Uid is required!" });
    }
    return response.status(200).send({...request.params, ...query});
})

app.post("/api", (request, response) => {
    const body = request.body
    console.log(body)
    return response.status(200).send(body)
})

app.listen(8080, (err) => {
    if (err) {
        return process.exit(1)
    }
    console.log("Server running: http://localhost:8080");
})

