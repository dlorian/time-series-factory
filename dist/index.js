'use strict';

const program = require('./program.js');
const tsFactory = require('./timeseries-factory');
const writer = require('./writer');
const log = require('./logger.js');

const granularityMapping = {
    '1d': 'DAILY',
    '1h': 'HOURLY',
    '15m': 'QUARTER_HOURLY'
};

const process = (input) => {
    let granularity = 'DAILY';
    if (input.granularity) {
        granularity = granularityMapping[input.granularity];
        if (!granularity) {
            throw new Error(`Granularity ${granularity} not supported`);
        }
    }

    const start = input.start;
    const end = input.end;
    const format = input.format || 'json';
    const fileName = input.output || 'test';
    const dstMode = input.dst || '2424';

    log.info(
        `You asked me to create a time series from '${start}' to '${end}' with a '${granularity}' granularity and DST correction '${dstMode}'. The time series will be creatd as '${format}' into '${fileName}.${format}'`
    );

    const tsStream = tsFactory.stream(input.start, input.end, { granularity, dstMode });

    writer
        .format(format)
        .write(`${fileName}.${format}`, tsStream)
        .then(() => log.info('Your time series has been created successfully.'))
        .catch(err =>
            log.error('Something went wrong while creating your file. \n', err)
        );
};


const result = program.parse(process.argv);
process(result);
