const log = require('../logger.js');
const xmlBuilder = require('xmlbuilder');

exports.write = data => {
    log.debug('Writing xml data');

    let root = xmlBuilder.create('root');
    data.forEach(element => {
        root.ele('tsvalue', { i: element.tsDate }, element.tsValue).end();
    });

    return root.end({ pretty: true });
};
