const fs = require('fs');
const log = require('../logger.js');

exports.write = (data) => {
    return JSON.stringify(data, null, 2);
};