const { DateTime } = require('luxon');

DateTime.local().setZone('local');
DateTime.local().reconfigure({ locale: 'de' });

const tsData = [];

const GRANUlARITY = {
    QUARTER_HOURLY: { minutes: 15 },
    HOURLY: { hours: 1 },
    DAILY: { hours: 24 }
};


const DST_MODE = {
    DST_2424: '2424',
    DST_2325: '2325',

    is2325: function (mode) {
        mode === '2325';
    }
};

const factory = function (start, end, options) {
    options = options || {};
    const granulartiy = options.granulartiy || 'HOURLY';
    const dstMode = options.dstMode || '2424';

    let startDate = DateTime.fromISO(start, { locale: 'de' });
    if (!startDate.isValid) {
        throw new Error(`Start date ${start} is not a valid date`);
    }
    startDate = startDate.startOf('day');

    let endDate = DateTime.fromISO(end, { locale: 'de' });
    if (!endDate.isValid) {
        throw new Error(`End date ${end} is not a valid date`);
    }
    endDate = endDate.startOf('day');

    const random = () => {
        return Math.random() * Math.random(10, 100);
    };

    const offset = GRANUlARITY[granulartiy];
    if (!offset) {
        throw new Error(`Granulartiy ${granulartiy} is not defined`);
    }

    let currentDate = startDate;
    let octoberShifted = false;
    let marchShifted = false;
    do {
        if (DST_MODE.is2325(dstMode)) {
            tsData.push({ tsDate: currentDate.toISO(), tsValue: random() });
        } else {
            const march = currentDate.month === 3;
            if (march) {
                const lastSunday = getLastSunday(currentDate);
                const twoAtNight = DateTime.local(lastSunday.get('year'), lastSunday.get('month'), lastSunday.get('day'), 2, 0, 0);
                if (currentDate.hasSame(twoAtNight, 'minute') && !marchShifted) {
                    marchShifted = true;
                    currentDate = currentDate.plus({ hours: 1 });
                }
            }

            const october = currentDate.month === 10;
            if (october) {
                const lastSunday = getLastSunday(currentDate);
                //console.log(`Last sunday of october is ${lastSunday}`);
                const threeAtNight = DateTime.local(lastSunday.get('year'), lastSunday.get('month'), lastSunday.get('day'), 3, 0, 0);
                if (currentDate.hasSame(threeAtNight, 'minute') && !octoberShifted) {
                    octoberShifted = true;
                    currentDate = currentDate.minus({ hours: 1 });
                }
            }
            tsData.push({ tsDate: currentDate.toISO(), tsValue: random() });
        }

        currentDate = currentDate.plus(offset);

    } while (currentDate < endDate);

    return tsData;
};

const getLastSunday = function (date) {
    const sunday = 7;
    let currentDate = date.endOf('month');

    while (currentDate.weekday !== sunday) {
        currentDate = currentDate.minus({ hours: 24 });
    }
    return currentDate.startOf('day');
};

module.exports = {
    DST_MODE: DST_MODE,
    GRANUlARITY: GRANUlARITY,
    create: (start, end, options) => factory(start, end, options)
};
