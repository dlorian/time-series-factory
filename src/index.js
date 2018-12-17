const cli = require('./cli');
const log = require('./logger.js');
const writer = require('./writer');
const tsFactory = require('@dlorian/ts-factory');

const granularityMapping = {
    '1d': 'DAILY',
    '1h': 'HOURLY',
    '15min': 'QUARTER_HOURLY'
};

const createFileName = options => {
    const stripDashes = string => string.replace(/-/g, '');
    return `ts-${options.granularity.toLowerCase()}-${stripDashes(options.start)}-${stripDashes(options.end)}`;
};

const cliCallback = answers => {
    log.debug('You answers are: ', JSON.stringify(answers));

    const granularity = granularityMapping[answers.granularity];

    const tsOptions = {
        start: answers.start,
        end: answers.end,
        format: answers.format || 'json',
        granularity: granularity || 'daily'
    };

    log.info(`You asked me to create a time series from '${tsOptions.start}' to '${tsOptions.end}' with a '${tsOptions.granularity}' granularity.`);
    const tsStream = tsFactory.stream(tsOptions);

    const fileName = answers.output || createFileName(tsOptions);
    log.info(`The time series will be creatd as '${tsOptions.format}' into '${fileName}.${tsOptions.format}`);

    writer
        .decorate(tsStream)
        .writeTo(`${fileName}.${tsOptions.format}`);
};

module.exports = {
    commander: {
        run: () => cli['commander'].run(cliCallback)
    },
    inquirer: {
        run: () => cli['inquirer'].run(cliCallback)
    }
};