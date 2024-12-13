const { Router } = require("express")
const contoller = require("../Controllers/todo.controller")

const todoRoute = Router() 

todoRoute.post("/todo", contoller.createTodo)
todoRoute.get("/todo", contoller.getList)
todoRoute.delete("/todo/:id?", contoller.deleteTodo)
todoRoute.patch("/todo/:id?", contoller.updateTodo)

module.exports = todoRoute