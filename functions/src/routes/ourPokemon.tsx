import express from 'express';
import { getClient } from '../db';
import Account, { Pokemon } from '../models/Pokemon';
// import { ObjectId } from 'mongodb';

const routes = express.Router();


routes.get("/accounts", async (req, res) => {
    try {
        const client = await getClient();
        const results = await client.db().collection("accounts")
            .find().toArray();
        res.json(results); // send JSON results
    } catch (err) {
        console.error("FAIL", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


routes.put("/", async (req, res) => {

    const pokemon = req.body as Pokemon | undefined;

    try {
        const client = await getClient();
        const result = await client.db().collection<Account>('accounts').updateOne({ username: "AndrewDamas" }, {$push: {ourPokemon: pokemon}});
        if (result.modifiedCount === 0) {
            res.status(404).json({ message: "Not Found" });
        } else {
            res.json(pokemon);
        }
    } catch (err) {
        console.error("FAIL", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

routes.put("/our-battle-damage", async (req, res) => {

    const battleDamage = req.body as number;

    try {
        const client = await getClient();
        const result = await client.db().collection<Account>('accounts').updateOne({ username: "AndrewDamas", "ourPokemon.active": true}, {$set: {'ourPokemon.$.current_hp': {$subtract: ['ourPokemon.$.current_hp', battleDamage]}}});
        if (result.modifiedCount === 0) {
            res.status(404).json({ message: "Not Found" });
        } else {
            res.json(battleDamage);
        }
    } catch (err) {
        console.error("FAIL", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

routes.put("/set-oak", async (req, res) => {

    const pokemon = req.body as Pokemon;

    try {
        const client = await getClient();
        const result = await client.db().collection<Account>('accounts').updateOne({ username: "AndrewDamas" }, {$push: {opponents: {name: "PROF OAK", pokemon: [pokemon], defeated: false}}});
        if (result.modifiedCount === 0) {
            res.status(404).json({ message: "Not Found" });
        } else {
            res.json(pokemon);
        }
    } catch (err) {
        console.error("FAIL", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

routes.get("/opponents", async (req, res) => {
    try {
        const client = await getClient();
        const results = await client.db().collection("opponents")
            .find().toArray();
        res.json(results); // send JSON results
    } catch (err) {
        console.error("FAIL", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


export default routes;