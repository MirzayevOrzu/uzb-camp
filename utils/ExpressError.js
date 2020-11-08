class ExpressError extends Error {
    constructor(message, statusCode) {
        super();
        this.message = message || 'Something went wrong try again';
        this.statusCode = statusCode || 500;
    }
}

module.exports = ExpressError;