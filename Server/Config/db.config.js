// mongoose => MongoDB connection => ODM (Object Data Modeling)
const mongoose = require("mongoose")

const connectionURL = "mongodb://127.0.0.1:27017"

const connectDB = async () => {
    try {
        const response = await mongoose.connect(connectionURL, {
            dbName: "sample_db5"
        })
        console.log("Connected DB:", response.connection.db.databaseName)
    } catch (err) {
        console.log(err)
    }
}

module.exports = connectDB
