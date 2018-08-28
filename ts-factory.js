const { DateTime } = require("luxon");

const writer = require("./writer/json-writer");

DateTime.local().setZone("local");
DateTime.local().reconfigure({ locale: "de" });

const tsData = [];

const GRANUlARITY_OFFSET = {
  QUARTER_HOURLY: { minutes: 15 },
  HOURLY: { hours: 1 },
  DAILY: { hours: 24 }
};

const factory = function (start, end, granulartiy) {
  let startDate = DateTime.fromISO(start, { locale: "de" });
  if (!startDate.isValid) {
    throw new Error(`Start date ${start} is not a valid date`);
  }
  startDate = startDate.startOf("day");

  let endDate = DateTime.fromISO(end, { locale: "de" });
  if (!endDate.isValid) {
    throw new Error(`End date ${end} is not a valid date`);
  }
  endDate = endDate.startOf("day");

  const random = () => {
    return Math.random() * Math.random(10, 100);
  }

  const offset = GRANUlARITY_OFFSET[granulartiy];
  if (!offset) {
    throw new Error(`Granulartiy ${granulartiy} is not defined`);
  }

  let currentDate = startDate;
  do {
    tsData.push({ tsDate: currentDate.toISO(), tsValue: random() });
    currentDate = currentDate.plus(offset);
  } while (currentDate < endDate);

  return tsData;
};

module.exports = {
  create: (start, end, granulartiy) => factory(start, end, granulartiy)
}
