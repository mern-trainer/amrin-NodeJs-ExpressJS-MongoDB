const { Router } = require('express');
const controller = require("../Controllers/db.controller")

const dbRoute = Router();

dbRoute.get("/", controller.findAll)

module.exports = dbRoute;