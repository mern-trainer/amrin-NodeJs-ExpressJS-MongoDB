const UserModel = require("../Models/user.model")

const findAll = async (req, res) => {
    try {
        const response = await UserModel.find()
        return res.status(200).send(response)
    } catch (err) {
        console.log(err)
        return res.status(500).send({
            message: "Internal Server Error"
        })
    }
}

module.exports = {findAll}