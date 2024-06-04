const router = require('express').Router();
const { MongoClient } = require("mongodb");
const fs = require('fs');
const getPath = require('../util/getPath').getPathData;
const uri = require('../util/uri');

router.get('/gainer', async (req, res) => {
    const client = new MongoClient(uri);

    try {
        const fileDatas = JSON.parse((fs.readFileSync(getPath('gainer'))).toString());

        const database = client.db('realtime-finance');
        const collection = database.collection('gainers');

        await collection.deleteMany();
        await collection.insertMany(fileDatas);

        const resDatas = await collection.find().toArray()
        await client.close();

        return res.json({
            count: resDatas.length,
            data: resDatas,
        });
    } catch (error) {
        return res.json({
            message: 'gagal',
            error: error.message,
        });
    }
});

router.get('/loser', async (req, res) => {
    const client = new MongoClient(uri);

    try {
        const fileDatas = JSON.parse((fs.readFileSync(getPath('loser'))).toString());

        const database = client.db('realtime-finance');
        const collection = database.collection('losers');

        await collection.deleteMany();
        await collection.insertMany(fileDatas);

        const resDatas = await collection.find().toArray()
        await client.close();

        return res.json({
            count: resDatas.length,
            data: resDatas,
        });
    } catch (error) {
        return res.json({
            message: 'gagal',
            error: error.message,
        });
    }
});

router.get('/crypto', async (req, res) => {
    const client = new MongoClient(uri);

    try {
        const fileDatas = JSON.parse((fs.readFileSync(getPath('crypto'))).toString());

        const database = client.db('realtime-finance');
        const collection = database.collection('crypto');

        await collection.deleteMany();
        await collection.insertMany(fileDatas);

        const resDatas = await collection.find().toArray()
        await client.close();

        return res.json({
            count: resDatas.length,
            data: resDatas,
        });
    } catch (error) {
        return res.json({
            message: 'gagal',
            error: error.message,
        });
    }
});

router.get('/mostActive', async (req, res) => {
    const client = new MongoClient(uri);

    try {
        const fileDatas = JSON.parse((fs.readFileSync(getPath('most_active'))).toString());

        const database = client.db('realtime-finance');
        const collection = database.collection('most_active');

        await collection.deleteMany();
        await collection.insertMany(fileDatas);

        const resDatas = await collection.find().toArray()
        await client.close();

        return res.json({
            count: resDatas.length,
            data: resDatas,
        });
    } catch (error) {
        return res.json({
            message: 'gagal',
            error: error.message,
        });
    }
});

module.exports = router;