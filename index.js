const program = require("./program.js");
const factory = require("./ts-factory.js");
const writer = require("./writer");
const log = require("./logger.js");

const result = program.parse(process.argv);

const granularityMapping = {
    "1d": "DAILY",
    "1h": "HOURLY",
    "15m": "QUARTER_HOURLY",
};

let granularity = "DAILY";
if (result.granularity) {
    console.log(result.granularity)
    granularity = granularityMapping[result.granularity];
    if (!granularity) {
        throw new Error(`Granularity ${granularity} not supported`);
    }
}

const start = result.start;
const end = result.end;
const format = result.format || "json";
const fileName = result.output || "test";

log.info(
    `You asked me to create a time series from '${start}' to '${end}' with a '${granularity}' granularity. The create time series will be creatd as '${format}' into '${fileName}.${format}'`);

const tsData = factory.create(result.start, result.end, granularity);

writer
    .format(format)
    .write(fileName, tsData)
    .then(() => log.info("Your time series has been created successfully."))
    .catch(err =>
        log.error("Something went wrong while creating your file. \n", err)
    );
