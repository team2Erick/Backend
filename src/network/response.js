exports.success = (req, res, message, status) => {
    res.status(status || 201).send({
        data: message
    })
}

exports.error = (req, res, error, status) => {
    res.status( 200).send({
        error: error
    })
}