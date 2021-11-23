import connection from './connection.js';
import login from './login.js';
import subscribers from './subscribers.js';
import citiesAndStates from './cityAndState.js';

export default function makeDbFactory() {
    function endConnection() {
        connection.end();
    }

    return {
        login,
        subscribers,
        citiesAndStates,
        endConnection,
    };
}
