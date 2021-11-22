function validateBody(schema) {
    return (req, res, next) => {
        const bodyError = schema.validate(req.body).error;
        if (bodyError) {
            return res.status(400).send(bodyError.details[0].message);
        }
        return next();
    };
}

function validateHeaders(schema) {
    return (req, res, next) => {
        const headersError = schema.validate(req.headers).error;
        if (headersError) {
            return res.status(401).send(headersError.details[0].message);
        }
        res.locals.token = req.headers.authorization.replace('Bearer ', '');
        return next();
    };
}

function validateHeadersAndBody(headersSchema, bodySchema) {
    return (req, res, next) => {
        const headersError = headersSchema.validate(req.headers).error;
        if (headersError) {
            return res.status(401).send(headersError.details[0].message);
        }
        res.locals.token = req.headers.authorization.replace('Bearer ', '');
        const bodyError = bodySchema.validate(req.body).error;
        if (bodyError) {
            return res.status(400).send(bodyError.details[0].message);
        }
        return next();
    };
}

export {
    validateBody,
    validateHeaders,
    validateHeadersAndBody,
};
