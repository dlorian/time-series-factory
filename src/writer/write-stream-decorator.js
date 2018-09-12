const fs = require('fs');
const log = require('../logger.js');

const write = function (fileName, stream, writer) {
    return new Promise((resolve, reject) => {
        const ws = fs.createWriteStream(`${fileName}`, { flags: 'w', encoding: 'utf8' });

        log.debug(`Writing data to file ${fileName}`);

        stream
            .on('finish', () => resolve())
            .on('error', (err) => reject(err))
            .pipe(writer.stream())
            .pipe(ws);
    });
};

exports.decorate = (writer) => {
    return {
        write: (fileName, stream) => write(fileName, stream, writer)
    };
};