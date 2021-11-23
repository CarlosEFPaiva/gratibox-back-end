import bcrypt from 'bcrypt';
import makeDbFactory from '../database/database.js';

const db = makeDbFactory();

async function signUp(req, res) {
    try {
        await db.login.add(req.body);
        return res.sendStatus(201);
    } catch (error) {
        console.error(error);
        if (error.detail.includes('already exists.')) {
            return res.sendStatus(409);
        }
        return res.sendStatus(500);
    }
}

async function signIn(req, res) {
    const {
        email,
        password,
    } = req.body;

    try {
        const user = await db.login.get({ email });
        if (!user) {
            return res.sendStatus(401);
        }

        const isValid = bcrypt.compareSync(password, user.password);
        if (!isValid) {
            return res.sendStatus(401);
        }
        const token = await db.login.createSession(user.id);
        const subscription = await db.subscribers.get(token);
        return res.send({
            ...subscription,
            token,
            login: user.name.split(' ')[0],
        });
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
}

export {
    signUp,
    signIn,
};
