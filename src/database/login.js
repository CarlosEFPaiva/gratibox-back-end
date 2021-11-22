import bcrypt from 'bcrypt';
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

const loginFactory = {
    add,
};

export default loginFactory;
