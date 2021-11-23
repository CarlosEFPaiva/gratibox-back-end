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

async function get(userData) {
    const {
        email,
        token,
    } = userData;

    let queryText = `
        SELECT
            login.id,
            login.email,
            login.password,
            login.name
        FROM
            login
        JOIN sessions
            ON sessions.login_id = login.id
        WHERE 1 = 1`;
    const params = [];
    if (email) {
        params.push(email);
        queryText += ` AND login.email iLIKE $${params.length}`;
    }
    if (token) {
        params.push(token);
        queryText += ` AND sessions.token = $${params.length}`;
    }
    const user = await connection.query(`${queryText};`, params);

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
