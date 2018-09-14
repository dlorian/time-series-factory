const { parse } = require("./program.js");

const log = require("./logger.js");
const writer = require('./writer');
const tsFactory = require("@dlorian/ts-factory");

const granularityMapping = {
  "1d": "DAILY",
  "1h": "HOURLY",
  "15m": "QUARTER_HOURLY"
};

const process = input => {
  let granularity = "DAILY";
  if (input.granularity) {
    granularity = granularityMapping[input.granularity];
    if (!granularity) {
      throw new Error(`Granularity ${granularity} not supported`);
    }
  }

  const fileName = input.output || "test";

  const tsOptions = {
    start: input.start,
    end: input.end,
    format: input.format || "json",
    dstMode: input.dst || "2424"
  };

  log.info(
    `You asked me to create a time series from '${tsOptions.start}' to '${tsOptions.end}' with a '${tsOptions.granularity}' granularity and DST correction '${tsOptions.dstMode}'. The time series will be creatd as '${tsOptions.format}' into '${fileName}.${tsOptions.format}'`
  );

  const tsStream = tsFactory.stream(tsOptions);

  writer
    .decorate(tsStream)
    .write(`${fileName}.${tsOptions.format}`)
    .then(() => log.info("Your time series has been created successfully."))
    .catch(err =>
      log.error("Something went wrong while creating your file. \n", err)
    );
};

process(parse(process.argv));
