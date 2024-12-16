const { Router } = require("express")
const controller = require("../Controllers/jwt.controller")

const jwtRoute = Router()

jwtRoute.get("/", controller.createJwt)

module.exports = jwtRoute
