/*eslint-disable */
const log = console.log;
/*eslint-enable */

const chalk = require('chalk');

const debugStyle = chalk.bold.yellow;
const errorStyle = chalk.bold.red;

let debugEnabled = false;

const init = (active = false) => (debugEnabled = active);

const info = (message) => {
    log(message);
};

const debug = (message) => {
    if (debugEnabled) log(debugStyle(message));
};

const error = (message, err) => {
    log(errorStyle(message, err));
};

module.exports = { debug, info, error, init };
