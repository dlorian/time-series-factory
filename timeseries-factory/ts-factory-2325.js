const dateUtils = require('./date-utils');
const valueGenerator = require('./value-generator');

exports.create = (startDate, endDate, offset) => {
    const tsData = [];

    let currentDate = startDate;
    let octoberShifted = false;
    let marchShifted = false;

    const dstTimeOfMarch = dateUtils.getDstDateTime(currentDate.get('year'), 'march');
    const dstTimeOfOctober = dateUtils.getDstDateTime(currentDate.get('year'), 'october');

    do {
        const march = currentDate.month === 3;
        if (march) {
            if (currentDate.hasSame(dstTimeOfMarch, 'minute') && !marchShifted) {
                marchShifted = true;
                currentDate = currentDate.plus({ hours: 1 });
            }
        }

        const october = currentDate.month === 10;
        if (october) {
            if (currentDate.hasSame(dstTimeOfOctober, 'minute') && !octoberShifted) {
                octoberShifted = true;
                currentDate = currentDate.minus({ hours: 1 });
            }
        }
        tsData.push({ tsDate: currentDate.toISO(), tsValue: valueGenerator.generate() });

        currentDate = currentDate.plus(offset);

    } while (currentDate < endDate);

    return tsData;
};