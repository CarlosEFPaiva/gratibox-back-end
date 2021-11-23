import joi from 'joi';

const zipcodeRegex = /[0-9]{8}$/;
const stateRegex = /[A-Z]{2}$/;

const headers = joi.object({
    authorization: joi.string().min(43).max(43).required(),
}).unknown(true);

const newSubscription = joi.object({
    plan: joi.string().min(6).max(7).required(),
    deliverDate: joi.string().min(1).max(7).required(),
    products: joi.array().items(joi.string().min(4).max(18).required()),
    name: joi.string().min(3).max(255).required(),
    adress: joi.string().min(3).max(255).required(),
    zipCode: joi.string().pattern(zipcodeRegex).required(),
    city: joi.string().min(3).max(255).required(),
    state: joi.string().pattern(stateRegex).required(),
});

const subscriptionSchemas = {
    headers,
    newSubscription,
};

export default subscriptionSchemas;
