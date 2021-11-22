import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import connection from './connection.js';

async function add(userData) {
    const {
        name,
        email,
        password,
    } = userData;

    const hash = bcrypt.hashSync(password, 10);

    await connection.query(
        `INSERT INTO login
            (name, email, password)
        VALUES
            ($1, $2, $3);
        `,
        [name, email, hash],
    );
}

async function get(email) {
    const user = await connection.query(`
        SELECT
            id,
            email,
            password,
            name
        FROM
            login
        WHERE email = $1
     ;`, [email]);
    return user.rows[0];
}

async function createSession(id) {
    const token = uuid();
    await connection.query(
        'INSERT INTO sessions (token, login_id) VALUES ($1,$2)',
        [token, id],
    );

    return token;
}

const loginFactory = {
    add,
    get,
    createSession,
};

export default loginFactory;
