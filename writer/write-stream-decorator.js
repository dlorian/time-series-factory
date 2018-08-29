const fs = require('fs');
const log = require('../logger.js');

const write = function (fileName, data, writer) {
    return new Promise((resolve, reject) => {
        log.debug(`Writing json data to file ${fileName}`);

        const ws = fs.createWriteStream(`${fileName}`, { flags: 'w', encoding: 'utf8' });

        const jsonData = writer.write(data);
        log.debug(`Data to write: \n ${jsonData}`);
        ws.write(jsonData, (err) => {
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
        write: (fileName, data) => async {
            write(fileName, data, writer)
        }
    }
}