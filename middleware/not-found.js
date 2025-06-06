function notFoundHandler(req, res) {
    return res.status(404).send(`<h1>Shahzaib, Page Not Found!</h1>`);
}

export default notFoundHandler;
