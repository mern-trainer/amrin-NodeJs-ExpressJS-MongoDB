const { v4: taskId } = require("uuid")
const todoModel = require("../Models/todo.model")

let todoList = []

const getList = async (_request, response) => {
    const res = await todoModel.find()
    return response.status(200).send({
        message: "All List",
        status: "OK",
        res
    }) 
}

const createTodo = async (request, response) => {
    const { body } = request
    const exist = await todoModel.findOne({ title: body.title });
    if (exist) {
        return response.status(409).send({
            message: "Task already exist",
            status: "Not OK"
        })
    }
    const res = await todoModel.create(body)
    return response.status(201).send({
        message: "New Task Created!",
        status: "OK",
        res
    })
}

const deleteTodo = async (request, response) => {
    const { id } = request.params
    if (!id) {
        return response.status(400).send({
            message: "Id is required",
            status: "Not OK"
        })
    }
    const res = await todoModel.findOneAndDelete({ _id: id})
    return response.status(200).send({
        message: "Task Removed",
        status: "OK",
        deleted: res
    }) 
}

const updateTodo = async (request, response) => { 
    const { id } = request.params
    const { body } = request
    if (!id) {
        return response.status(400).send({
            message: "Id is required",
            status: "Not OK"
        })
    }
    await todoModel.updateOne({ _id: id},{$set: body})
    return response.status(200).send({
        message: "Task Updated",
        status: "OK",
        updated: await todoModel.findOne({ _id: id})
    })
}

module.exports = {getList, createTodo, deleteTodo, updateTodo}