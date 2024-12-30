const { Router } = require("express");
const controller = require("../Controllers/user.controller");
const Auth = require("../Middleware/Auth");

const userRoute = Router()

userRoute.post("/", controller.createUser)
userRoute.get("/login", controller.login)
userRoute.get("/", controller.getList)
userRoute.delete("/:id?", controller.deleteUser)
userRoute.patch("/:id?", controller.updateUser)
userRoute.get("/sample", Auth, controller.getDetails)

module.exports = userRoute