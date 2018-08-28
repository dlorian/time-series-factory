const jsonWriter = require('./json-writer.js');
const log = require('../logger.js');

const writers = {
    'json': jsonWriter
}

module.exports = {
    format: (format) => {
        log.debug(`Get writer for format ${format}`);
        const writer = writers[format];
        if(!writer) {
            throw new Error(`Format ${format} not supported`);
        }
        return writer;
    }
}