const loggerMid = (req, res, next) => {
    const startTime = new Date().getTime()
    const { method, url: path } = req
    res.on("finish", () => {
        const endTime = new Date().getTime()
        console.log(`${method} ${path} - ${res.statusCode} - ${endTime - startTime} --ms`)
    })
    next()
}

module.exports = loggerMid