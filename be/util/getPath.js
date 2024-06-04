const path = require('path');
const getPathData = (filename = "gainer") => path.join(__dirname, '..', 'data', `${filename}.json`);
const getPathData2 = (filename = "gainer") => path.join(__dirname, '..', 'data2', `${filename}.json`);
module.exports = { getPathData, getPathData2 };