const log = require('./logger.js');

const { createWriteStream } = require('fs');

const write = function (fileName, stream) {
    return new Promise((resolve, reject) => {
        const ws = createWriteStream(`${fileName}`, {
            flags: 'w',
            encoding: 'utf8'
        });

        stream.on('finish', resolve)
            .on('error', reject)
            .pipe(ws);
    });
};

const decorate = tsStream => {
    return {
        writeTo: fileName => {
            write(fileName, tsStream)
                .then(() => log.info('Your time series has been created successfully.'))
                .catch(err => log.error('Something went wrong while writing your file. \n', err));
        }
    };
};

module.exports = { decorate };
