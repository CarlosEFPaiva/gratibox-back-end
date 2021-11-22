import express from 'express';
import cors from 'cors';
import { signUp } from './controllers/login.js';
import { validateBody } from './middlewares/validateRequest.js';
import schemas from './schemas/login.js';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/status', (req, res) => {
    res.sendStatus(200);
});

app.post('/signup', validateBody(schemas.signUp), signUp);

export default app;
