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

export {
    signUp,
};
