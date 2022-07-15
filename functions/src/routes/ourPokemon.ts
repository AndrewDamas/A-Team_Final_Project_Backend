import express from 'express';
import { getClient } from '../db';
import Account, { Pokemon } from '../models/Pokemon';
// import { ObjectId } from 'mongodb';
//import ShoutOut from '../models/shoutout';

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


export default routes;