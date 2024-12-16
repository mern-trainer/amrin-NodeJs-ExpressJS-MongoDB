const jwt = require("jsonwebtoken")
const { v4 } = require("uuid")
require("dotenv").config()

const createJwt = (request, response) => { 
    const id = v4()
    const token = jwt.sign({ sub: { id } }, process.env.JWT_SECRET, { expiresIn: "3d" })
    return response.status(200).send({ message: "DONE", token });
}

module.exports = {createJwt}