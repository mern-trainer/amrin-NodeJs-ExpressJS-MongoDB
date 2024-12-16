const { v4: taskId } = require("uuid")

let todoList = []

const getList = (_request, response) => {
    return response.status(200).send({
        message: "All List",
        status: "OK",
        todoList
    }) 
}

const createTodo = (request, response) => {
    const { body } = request
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
}

const deleteTodo = (request, response) => {
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
}

const updateTodo = (request, response) => { 
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
}

module.exports = {getList, createTodo, deleteTodo, updateTodo}