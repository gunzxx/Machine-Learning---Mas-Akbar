const axios = require('axios');
const router = require('express').Router();
const fs = require('fs');
const getPath = require('../util/getPath').getPathData;


router.get('/gainer', async (_, res) => {
    try {
        const options = {
            method: 'GET',
            url: 'https://real-time-finance-data.p.rapidapi.com/market-trends',
            params: {
                trend_type: 'GAINERS',
                country: 'us',
                language: 'en'
            },
            headers: {
                'X-RapidAPI-Key': '98eb3681b3mshabb0bbd843b815fp122eb4jsnde563d2ec0da',
                'X-RapidAPI-Host': 'real-time-finance-data.p.rapidapi.com'
            }
        };

        const response = await axios.request(options);
        const resDatas = response.data.data.trends;
        fs.writeFileSync(getPath('gainer'), JSON.stringify(resDatas));

        res.json({
            message: 'berhasil',
        })
    } catch (error) {
        return res.json({
            message: 'gagal',
            error: error.message,
        })
    }
});

router.get('/loser', async (_, res) => {
    try {
        const options = {
            method: 'GET',
            url: 'https://real-time-finance-data.p.rapidapi.com/market-trends',
            params: {
                trend_type: 'LOSERS',
                country: 'us',
                language: 'en'
            },
            headers: {
                'X-RapidAPI-Key': '98eb3681b3mshabb0bbd843b815fp122eb4jsnde563d2ec0da',
                'X-RapidAPI-Host': 'real-time-finance-data.p.rapidapi.com'
            }
        };

        const response = await axios.request(options);
        const resDatas = response.data.data.trends;
        fs.writeFileSync(getPath('loser'), JSON.stringify(resDatas));

        res.json({
            message: 'berhasil',
        })
    } catch (error) {
        return res.json({
            message: 'gagal',
            error: error.message,
        })
    }
});

router.get('/crypto', async (_, res) => {
    try {
        const options = {
            method: 'GET',
            url: 'https://real-time-finance-data.p.rapidapi.com/market-trends',
            params: {
                trend_type: 'CRYPTO',
                country: 'us',
                language: 'en'
            },
            headers: {
                'X-RapidAPI-Key': '98eb3681b3mshabb0bbd843b815fp122eb4jsnde563d2ec0da',
                'X-RapidAPI-Host': 'real-time-finance-data.p.rapidapi.com'
            }
        };

        const response = await axios.request(options);
        const resDatas = response.data.data.trends;
        fs.writeFileSync(getPath('crypto'), JSON.stringify(resDatas));

        res.json({
            message: 'berhasil',
        })
    } catch (error) {
        return res.json({
            message: 'gagal',
            error: error.message,
        })
    }
});

router.get('/mostActive', async (_, res) => {
    try {
        const options = {
            method: 'GET',
            url: 'https://real-time-finance-data.p.rapidapi.com/market-trends',
            params: {
                trend_type: 'MOST_ACTIVE',
                country: 'us',
                language: 'en'
            },
            headers: {
                'X-RapidAPI-Key': '98eb3681b3mshabb0bbd843b815fp122eb4jsnde563d2ec0da',
                'X-RapidAPI-Host': 'real-time-finance-data.p.rapidapi.com'
            }
        };

        const response = await axios.request(options);
        const resDatas = response.data.data.trends;
        fs.writeFileSync(getPath('most_active'), JSON.stringify(resDatas));

        res.json({
            message: 'berhasil',
        })
    } catch (error) {
        return res.json({
            message: 'gagal',
            error: error.message,
        })
    }
});

module.exports = router;