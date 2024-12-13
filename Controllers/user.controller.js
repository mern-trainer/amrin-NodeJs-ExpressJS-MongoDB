const { v4 } = require("uuid")
const bcrypt = require("bcrypt")

let userList = []

const createUser = async (request, response) => {
    const { body } = request
    body.id = v4()
    const salt = 10
    const hashPassword = await bcrypt.hash(body.password, salt)
    body.password = hashPassword
    userList.push(body)
    return response.status(201).send({
        message: "user created",
        body
    })
}

const login = async (request, response) => {
    const { username, password } = request.query
    if (!username || !password) {
        return response.status(400).send({
            message: "Username and password are required"
        })
    }
    const user = userList.find(item => item.username.toLowerCase() == username.toLowerCase())
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
    return response.status(200).send({
        message: "Authentication success",
        user
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

module.exports = {createUser, getList, deleteUser, updateUser, login}