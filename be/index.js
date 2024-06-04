const { MongoClient } = require("mongodb");
const app = require('express')();
const port = 3000;
var cors = require('cors')

const loadRoute = require('./routes/load');
const extractRoute = require('./routes/extract');
const apiRoute = require('./routes/api');
const api2Route = require('./routes/api2');
const timeRoute = require('./routes/time');

app.listen(port, () => {
    console.log(`app run in http://localhost:${port}`);
});

app.use(cors());
app.use('/load',loadRoute);
app.use('/extract',extractRoute);
app.use('/api',apiRoute);
app.use('/api2',api2Route);
app.use('/time',timeRoute);

app.get('/', async (_, res) => {
    res.json({
        message: 'hello gess',
    });
});

