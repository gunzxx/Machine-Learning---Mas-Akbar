const router = require('express').Router();
const { MongoClient } = require("mongodb");
const uri = require('../util/uri');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { getPathData2 } = require('../util/getPath');


router.get('/tes', async (req, res) => {
    try {
        console.log(new Date().toISOString().split('T')[0]);
        // const response = await axios.get('https://api.goapi.io/stock/idx/AGAR/historical', {
        //     headers: {
        //         'X-API-KEY': '7ac9bfd9-d395-5f6c-6c20-41ac4243',
        //     },
        //     body: {
        //         from: '2024-05-01',
        //         to: '2024-05-31',
        //     },
        // });
        
        res.json({
            data: response.data,
        });
    } catch (error) {
        res.json({
            status: 'gagal',
            message: error.message,
            stack: error.stack,
        });
    }
});

router.get('/gainer', (_, res) => {
    const resDatas = JSON.parse(fs.readFileSync(getPathData2('gainer')));
    res.json({
        count: resDatas.length,
        data: resDatas,
    });
});

router.get('/loser', (_, res) => {
    const resDatas = JSON.parse(fs.readFileSync(getPathData2('loser')));
    res.json({
        count: resDatas.length,
        data: resDatas,
    });
});

router.get('/history', (_, res) => {
    const resDatas = JSON.parse(fs.readFileSync(getPathData2('history')));
    res.json({
        count: resDatas.length,
        data: resDatas,
    });
});

router.get('/profile', (_, res) => {
    const resDatas = JSON.parse(fs.readFileSync(getPathData2('profile')));
    res.json({
        count: resDatas.length,
        data: resDatas,
    });
});

module.exports = router;