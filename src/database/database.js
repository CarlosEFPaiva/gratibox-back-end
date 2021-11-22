import connection from './connection.js';
import login from './login.js';

export default function makeDbFactory() {
    function endConnection() {
        connection.end();
    }

    return {
        login,
        endConnection,
    };
}
