const cli = require('./cli');
const log = require('./logger.js');
const factory = require('./factory');
const writer = require('./writer');


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
    log.init(answers.debug);

    const granularity = granularityMapping[answers.granularity];

    const tsOptions = {
        start: answers.start,
        end: answers.end,
        format: answers.format || 'json',
        granularity: granularity || 'daily'
    };

    tsOptions.fileName = answers.output || createFileName(tsOptions);

    log.debug(`You time series will be created according to this: ${JSON.stringify(tsOptions, null, 2)}`);

    writer
        .writeTo(tsOptions.fileName, tsOptions.format)
        .decorate(factory.stream(tsOptions));
};

module.exports = {
    commander: {
        run: () => cli['commander'].run(cliCallback)
    },
    inquirer: {
        run: () => cli['inquirer'].run(cliCallback)
    }
};