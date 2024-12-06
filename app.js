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
const { v4: taskId } = require("uuid")

const app = express()

app.use(express.json())

let todoList = []

app.post("/todo", (request, response) => {
    const { body } = request // title, description
    body.id = taskId()
    const dateTime = new Date().toISOString()
    body.createdAt = dateTime
    body.updatedAt = dateTime
    const index = todoList.findIndex(todo => todo.title.toLowerCase() == body.title.toLowerCase())
    if (index > -1) {
        return response.status(409).send({
            message: "Task already exist",
            status: "Not OK"
        })
    }
    todoList.push(body)
    return response.status(201).send({
        message: "New Task Created!",
        status: "OK",
        body
    })
})

app.get("/todo", (request, response) => {
    return response.status(200).send({
        message: "All List",
        status: "OK",
        todoList
    }) 
})

app.delete("/todo/:id?", (request, response) => {
    const { id } = request.params
    if (!id) {
        return response.status(400).send({
            message: "Id is required",
            status: "Not OK"
        })
    }
    const todo = todoList.find(item => item.id == id)
    todoList = todoList.filter(todo => todo.id !== id)
    return response.status(200).send({
        message: "Task Removed",
        status: "OK",
        deleted: todo
    }) 
})

app.patch("/todo/:id?", (request, response) => { 
    const { id } = request.params
    const { body } = request
    if (!id) {
        return response.status(400).send({
            message: "Id is required",
            status: "Not OK"
        })
    }
    todoList = todoList.map(todo => {
        if (todo.id == id) {
            return { ...todo, ...body }
        }
        return todo
    })
    return response.status(200).send({
        message: "Task Updated",
        status: "OK",
        updated: todoList.find(todo => todo.id == id)
    })
})

app.listen(8080, (err) => {
    if (err) {
        return process.exit(1)
    }
    console.log("Server running: http://localhost:8080");
})

