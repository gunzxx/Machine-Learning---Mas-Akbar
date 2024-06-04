const router = require('express').Router();
const { MongoClient } = require("mongodb");
const uri = require('../util/uri');
const axios = require('axios');

router.get('/gainer', async (_, res) => {
    const client = new MongoClient(uri);
    const database = client.db('realtime-finance');
    const collection = database.collection('gainers');
    const resDatas = await collection.find().toArray();

    res.json({
        count: resDatas.length,
        data: resDatas,
    });
});

router.get('/loser', async (_, res) => {
    const client = new MongoClient(uri);
    const database = client.db('realtime-finance');
    const collection = database.collection('losers');
    const resDatas = await collection.find().toArray();

    res.json({
        count: resDatas.length,
        data: resDatas,
    });
});

router.get('/crypto', async (_, res) => {
    const client = new MongoClient(uri);
    const database = client.db('realtime-finance');
    const collection = database.collection('crypto');
    const resDatas = await collection.find().toArray();

    res.json({
        count: resDatas.length,
        data: resDatas,
    });
});

router.get('/most_active', async (_, res) => {
    const client = new MongoClient(uri);
    const database = client.db('realtime-finance');
    const collection = database.collection('most_active');
    const resDatas = await collection.find().toArray();

    res.json({
        count: resDatas.length,
        data: resDatas,
    });
});

module.exports = router;