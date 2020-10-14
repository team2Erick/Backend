exports.success = (req, res, message, status) => {
    res.status(status || 201).send({
        data: message
    })
}

exports.error = (req, res, error, status) => {
    res.status(status || 500).send({
        error: error
    })
}