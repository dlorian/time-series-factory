const log = require('./logger.js');

const { createWriteStream } = require('fs');

const resolveFileName = (name, format) => `${name}.${format}`;

const writeStream = function (fileName, stream) {
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

const writeTo = (name, format) => {
    return {
        decorate: tsStream => {
            const fileName = resolveFileName(name, format);
            log.info(`The time series will be creatd as '${format}' into '${fileName}`);

            writeStream(fileName, tsStream)
                .then(() => log.info('Your time series has been created successfully.'))
                .catch(err => log.error('Something went wrong while writing your file. \n', err));
        }
    };
};

module.exports = { writeTo };
