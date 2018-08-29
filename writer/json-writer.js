const log = require('../logger.js');

exports.write = (data) => {
    log.debug('Writing json data');
    return JSON.stringify(data, null, 2);
};