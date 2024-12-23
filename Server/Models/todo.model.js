const { Schema, model } = require("mongoose");

const todoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

const todoModel = model("todos", todoSchema)

module.exports = todoModel