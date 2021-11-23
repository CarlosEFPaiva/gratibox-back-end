import connection from './connection.js';

async function get(token) {
    const result = await connection.query(`
        SELECT
            login,
            "subscriptionDate",
            plan,
            "deliverDate",
            array_to_string(array_agg(distinct "product"), ',') AS products
        FROM     
            (SELECT
                login.name AS "login",
                subscribers.subscription_date AS "subscriptionDate",
                plans.name AS "plan",
                deliver_dates.name AS "deliverDate",
                products.name AS "product"
            FROM
                login
            JOIN
                sessions ON login.id = sessions.login_id
            JOIN
                subscribers ON login.id = subscribers.login_id
            JOIN
                deliver_dates ON subscribers.deliver_date_id = deliver_dates.id
            JOIN
                plans ON plans.id = deliver_dates.plan_id
            JOIN
                cities ON subscribers.city_id = cities.id
            JOIN
                states ON subscribers.state_id = states.id
            JOIN
                subscribers_and_products ON subscribers.id = subscribers_and_products.subscriber_id
            JOIN
                products ON subscribers_and_products.product_id = products.id
            WHERE sessions.token = $1) AS aux
            GROUP BY
                login,
                "subscriptionDate",
                plan,
                "deliverDate";
    `, [token]);
    const subscription = result.rows[0];
    return {
        ...subscription,
        products: subscription?.products.split(','),
    };
}

async function add(newSubscriptionData) {
    const {
        loginId,
        deliverDate,
        products,
        name,
        adress,
        zipCode,
        cityId,
        stateId,
    } = newSubscriptionData;

    const subscription = await connection.query(`
        INSERT INTO subscribers
            (login_id, deliver_date_id, full_name, subscription_date, adress, zip_code, city_id, state_id)
        VALUES
        (
            $1,
            (SELECT id FROM deliver_dates WHERE name = $2),
            $3,
            $4,
            $5,
            $6,
            $7,
            $8
        ) RETURNING *;
    `, [
        loginId,
        deliverDate,
        name,
        new Date(),
        adress,
        zipCode,
        cityId,
        stateId,
    ]);
    let queryText = `
    INSERT INTO
        subscribers_and_products
    (subscriber_id, product_id)
    VALUES`;
    const params = [subscription.rows[0].id];
    products.forEach((product, index) => {
        params.push(product);
        queryText += (` ($1, (SELECT id from products WHERE name = $${params.length}))`);
        if (index !== products.length - 1) {
            queryText += ' ,';
        }
    });

    await connection.query(`${queryText};`, params);
    return '';
}

const subscribersFactory = {
    get,
    add,
};

export default subscribersFactory;
