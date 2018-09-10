const valueGenerator = require('./value-generator');

exports.create = (startDate, endDate, offset) => {
    const tsData = [];
    let currentDate = startDate;
    do {
        tsData.push({ tsDate: currentDate.toISO(), tsValue: valueGenerator.generate() });
        currentDate = currentDate.plus(offset);
    } while (currentDate < endDate);

    return tsData;
};