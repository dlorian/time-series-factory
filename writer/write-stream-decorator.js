const fs = require('fs');
const log = require('../logger.js');

const write = function (fileName, data, writer) {
    return new Promise((resolve, reject) => {
        log.debug(`Writing json data to file ${fileName}`);

        const ws = fs.createWriteStream(`${fileName}`, { flags: 'w', encoding: 'utf8' });

        const result = writer.write(data);
        log.debug(`Data to write: \n ${result}`);
        ws.write(result, (err) => {
            ws.close();

            if(err) {
                log.error('Error while writing json data', err);
                return reject(err);
            }

            log.info('Json data written successfully');
            resolve();
        });
    });
};

exports.decorate = (writer) => {
    log.debug('Decorating writer: ' + writer);
    return {
        write: (fileName, data) => write(fileName, data, writer)
    }
}