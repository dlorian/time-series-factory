const chalk = require('chalk');
const log = console.log;

const debugStyle = chalk.bold.yellow;
const errorStyle = chalk.bold.red;

const info = (message) => {
    log(message);
};

const debug = (message) => {
    log(debugStyle(message));
};

const error = (message, err) => {
    log(errorStyle(message, err));
};

module.exports = { debug, info, error };
