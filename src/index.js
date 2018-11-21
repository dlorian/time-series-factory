const cli = require('./cli/commander/program.js');

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

const exec = answers => {
    log.debug('You answers are: ', JSON.stringify(answers));

    const granularity = granularityMapping[answers.granularity];

    const tsOptions = {
        start: answers.start,
        end: answers.end,
        format: answers.format || 'json',
        granularity: granularity || 'daily'
    };

    const fileName = answers.output || createFileName(tsOptions);

    log.info(
        `You asked me to create a time series from '${tsOptions.start}' to '${
            tsOptions.end
        }' with a '${
            tsOptions.granularity
        }' granularity. The time series will be creatd as '${
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

exports.run = () => {
    cli.run()
    .then(exec)
    .catch(err => {
        log.error('Something unexpected happend. We are sooo sorry.', err);
        process.exit(1);
    });
};