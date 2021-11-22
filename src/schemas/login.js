import joi from 'joi';

const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-_@$!#=+.%*?&])[A-Za-z\d-@_$!#=+.%*?&]{8,20}$/;
// const zipcodeRegex = /[0-9]{8}$/;

const signUp = joi.object({
    name: joi.string().max(255).required(),
    email: joi.string().pattern(emailRegex).required(),
    password: joi.string().pattern(passwordRegex).required(),
});

const signIn = joi.object({
    email: joi.string().pattern(emailRegex).required(),
    password: joi.string().pattern(passwordRegex).required(),
});

const schemas = {
    signUp,
    signIn,
};

export default schemas;
