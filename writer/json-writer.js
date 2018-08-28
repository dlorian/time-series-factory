const fs = require('fs');
const log = require('../logger.js');

exports.write = function (fileName, data) {
    return new Promise((resolve, reject) => {
        log.debug(`Writing json data to file ${fileName}`);

        const ws = fs.createWriteStream(`${fileName}.json`, { flags: 'w', encoding: 'utf8' });

        const jsonData = JSON.stringify(data);
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