const not_found_middleware = (req, res, next) => {
    res.status(404).json({
        status: 404,
        error: "page not found"
    });
}

module.exports = not_found_middleware