const axios = require('axios');
const router = require('express').Router();
const fs = require('fs');
const getPath = require('../util/getPath').getPathData;

router.get('/:symbol', async (req, res) => {
    try {
        const options = {
            method: 'GET',
            url: 'https://real-time-finance-data.p.rapidapi.com/stock-time-series',
            params: {
              symbol: req.params.symbol,
              period: '5Y',
              language: 'en'
            },
            headers: {
              'X-RapidAPI-Key': '98eb3681b3mshabb0bbd843b815fp122eb4jsnde563d2ec0da',
              'X-RapidAPI-Host': 'real-time-finance-data.p.rapidapi.com'
            }
          };
        const response = await axios.request(options);
        const resDatas = response.data.data;

        res.json({
            message: 'berhasil',
            data: resDatas,
        });
    } catch (error) {
        res.json({
            status: 'gagal',
            message: error.message,
        });
    }
});

router.get('/', (_, res) => {
    return res.json(JSON.parse(fs.readFileSync(getPath('time_series')).toString()));
});

module.exports = router;