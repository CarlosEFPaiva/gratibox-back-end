import express from 'express';
import cors from 'cors';
import { signIn, signUp } from './controllers/login.js';
import { newSubscription } from './controllers/subscribers.js';
import { validateBody, validateHeadersAndBody } from './middlewares/validateRequest.js';
import loginSchemas from './schemas/login.js';
import subscriptionSchemas from './schemas/subscribers.js';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/status', (req, res) => {
    res.sendStatus(200);
});

app.post('/signup', validateBody(loginSchemas.signUp), signUp);
app.post('/signin', validateBody(loginSchemas.signIn), signIn);

app.post('/new-subscription', validateHeadersAndBody(subscriptionSchemas.headers, subscriptionSchemas.newSubscription), newSubscription);

export default app;
