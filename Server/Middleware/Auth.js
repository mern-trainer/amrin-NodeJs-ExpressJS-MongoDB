const jwt = require("jsonwebtoken");

const Auth = (request, response, next) => {
    try {
        const bearerToken = request.headers.authorization;
        if(!bearerToken) {
            return response.status(401).send({
                message: "Unauthorized"
            })
        }  
        const [_, token] = bearerToken.split(" ");
        if (!token) {
            return response.status(401).send({
                message: "Unauthorized"
            })
        }
        try {
            const res = jwt.verify(token, process.env.JWT_SECRET)
            if (res) {
                next()
            } else {
                return response.status(401).send({
                    message: "Unauthorized"
                })
            }
        } catch (err) {
            return response.status(401).send({
                message: "Unauthorized"
            })
        }
    } catch (error) {
        return response.status(500).send({
            message: "Internal server error"
        })
    }
}

module.exports = Auth