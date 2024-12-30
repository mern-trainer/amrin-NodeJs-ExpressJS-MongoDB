const { v4 } = require("uuid")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const UserModel = require("../Models/user.model")
require("dotenv").config()

let userList = []

const createUser = async (request, response) => {
    try {
        const { body } = request
        const usernameExist = await UserModel.findOne({ username: body.username })
        if (usernameExist) {
            return response.status(409).send({ message: "Username already exist" });
        }
        const salt = 10
        const hashPassword = await bcrypt.hash(body.password, salt)
        body.password = hashPassword
        const res = await UserModel.create(body)
        if (res?._id) {
            res.password = null
            const token = jwt.sign({ sub: res }, process.env.JWT_SECRET, { expiresIn: "7d" }); // sub => subject
            return response.status(201).send({ message: "user created", res, token });
        }
        return response.status(500).send({
            message: "Error happend"
        })
    } catch (err) {
        return response.status(500).send({
            message: err.message.replaceAll("Path", "") || "Internal server error"
        })
    }
}

const login = async (request, response) => {
    const { username, password } = request.query
    if (!username || !password) {
        return response.status(400).send({
            message: "Username and password are required"
        })
    }
    const user = await UserModel.findOne({ username });
    if (!user) {
        return response.status(404).send({
            message: "user does not exist"
        })
    }
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
        return response.status(400).send({
            message: "Invalid credentials"
        })
    }
    user.password = null
    const token = jwt.sign({ sub: user }, process.env.JWT_SECRET, { expiresIn: "7d" }); // sub => subject
    return response.status(200).send({
        message: "Authentication success",
        user, token
    })
}

const getList = (request, response) => {
    return response.status(201).send({
        message: "user list",
        userList
    })
}

const deleteUser = (request, response) => {
    const { id } = request.params
    if (!id) {
        return response.status(400).send({
            message: "Id field is required"
        })
    }
    const user = userList.find(item => item.id == id)
    if (!user) {
        return response.status(404).send({
            message: "user does not exist"
        })
    }
    userList = userList.filter(item => item.id != id)
    return response.status(201).send({
        message: "user deleted",
        user
    })
}

const updateUser = (request, response) => {
    const { id } = request.params
    const { body } = request
    if (!id) {
        return response.status(400).send({
            message: "Id field is required"
        })
    }
    const index = userList.findIndex(item => item.id == id)
    if (index == -1) {
        return response.status(404).send({
            message: "user does not exist"
        })
    }
    userList = userList.map(item => {
        if (item.id == id) {
            return {...item, ...body}
        }
        return item
    })
    return response.status(200).send({
        message: "user updated",
        user: userList[index]
    })
}

const getDetails = (request, response) => {
    return response.status(200).send({
        message: "Sample Data"
    })
}

module.exports = { createUser, getList, deleteUser, updateUser, login, getDetails }