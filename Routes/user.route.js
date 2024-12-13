const { Router } = require("express");
const controller = require("../Controllers/user.controller")

const userRoute = Router()

userRoute.post("/", controller.createUser)
userRoute.get("/login", controller.login)
userRoute.get("/", controller.getList)
userRoute.delete("/:id?", controller.deleteUser)
userRoute.patch("/:id?", controller.updateUser)

module.exports = userRoute