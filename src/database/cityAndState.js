import connection from './connection.js';

async function add({ city, state }) {
    const result = await connection.query(`
        WITH
            "existingCity" as (
                SELECT
                    id AS "cityId",
                    name AS "cityName"
                FROM cities
                WHERE name = $1
            ),
            "newCity" as (
                INSERT INTO cities
                    (name)
                SELECT
                    $1
                WHERE NOT EXISTS (
                    SELECT * from "existingCity"
                )
                RETURNING id AS "cityId", name AS "cityName"
            ),
            "existingState" as (
                SELECT
                    id AS "stateId",
                    name AS "stateName"
                FROM states
                WHERE name = $2
            ),
            "newState" as (
                INSERT INTO states
                    (name)
                SELECT
                    $2
                WHERE NOT EXISTS (
                    SELECT * from "existingState"
                )
                RETURNING id AS "stateId", name AS "stateName"
            )
        SELECT * FROM
            (
        (SELECT *
        FROM "existingCity"
        UNION ALL
        SELECT *
        FROM "newCity") AS city
        CROSS JOIN
        (SELECT *
        FROM "existingState"
        UNION ALL
        SELECT *
        FROM "newState") AS state);
    `, [city, state]);
    return result.rows[0];
}

const citiesAndStatesFactory = {
    add,
};

export default citiesAndStatesFactory;
