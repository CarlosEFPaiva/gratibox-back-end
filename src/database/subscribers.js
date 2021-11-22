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

const subscribersFactory = {
    get,
};

export default subscribersFactory;
