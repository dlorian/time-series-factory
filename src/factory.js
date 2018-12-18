const tsFactory = require('@dlorian/ts-factory');

const log = require('./logger.js');

module.exports = {
    stream: (tsOptions) => {
        log.info(`You asked me to create a time series from '${tsOptions.start}' to '${tsOptions.end}' with a '${tsOptions.granularity}' granularity.`);
        return tsFactory.stream(tsOptions);
    }
};