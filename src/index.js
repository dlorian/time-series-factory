const cli = require('./cli/index.js');

const log = require('./logger.js');
const writer = require('./writer');
const tsFactory = require('@dlorian/ts-factory');

const granularityMapping = {
    '1d': 'DAILY',
    '1h': 'HOURLY',
    '15min': 'QUARTER_HOURLY'
};

const process = answers => {
    log.debug('You answers are {}', answers);

    let granularity = 'DAILY';
    if (answers.granularity) {
        granularity = granularityMapping[answers.granularity];
        if (!granularity) {
            throw new Error(`Granularity '${granularity}' not supported`);
        }
    }

    const fileName = answers.output || 'test';

    const tsOptions = {
        start: answers.start,
        end: answers.end,
        format: answers.format || 'json'
    };

    log.info(
        `You asked me to create a time series from '${tsOptions.start}' to '${
            tsOptions.end
        }' with a '${tsOptions.granularity}' granularity and DST correction '${
            tsOptions.dstMode
        }'. The time series will be creatd as '${
            tsOptions.format
        }' into '${fileName}.${tsOptions.format}'`
    );

    const tsStream = tsFactory.stream(tsOptions);

    writer
        .decorate(tsStream)
        .write(`${fileName}.${tsOptions.format}`)
        .then(() => log.info('Your time series has been created successfully.'))
        .catch(err =>
            log.error('Something went wrong while creating your file. \n', err)
        );
};

cli.run()
    .then(process)
    .catch(err =>
        log.error('Something unexpected happend. We are so sorry.', err)
    );
