const { Router } = require("express")
const contoller = require("../Controllers/todo.controller")

const todoRoute = Router() 

todoRoute.post("/", contoller.createTodo)
todoRoute.get("/", contoller.getList)
todoRoute.delete("/:id?", contoller.deleteTodo)
todoRoute.patch("/:id?", contoller.updateTodo)

module.exports = todoRoute