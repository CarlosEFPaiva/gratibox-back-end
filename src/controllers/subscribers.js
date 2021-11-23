import makeDbFactory from '../database/database.js';

const db = makeDbFactory();

async function newSubscription(req, res) {
    const {
        plan,
        deliverDate,
        products,
        name,
        adress,
        zipCode,
        city,
        state,
    } = req.body;
    try {
        const user = await db.login.get({ token: res.locals.token });
        if (!user) {
            return res.sendStatus(404);
        }
        const cityAndState = await db.citiesAndStates.add({ city, state });
        await db.subscribers.add({
            loginId: user.id,
            plan,
            deliverDate,
            products,
            name,
            adress,
            zipCode,
            ...cityAndState,
        });

        return res.sendStatus(201);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
}

export {
    newSubscription,
};
