const chalk = require('chalk');
const log = console.log;

const infoStyle = chalk.bold.white;
const debugStyle = chalk.bold.yellow;
const errorStyle = chalk.bold.red;

const info = (message, ...args) => {
    log(message, args);
};

const debug = (message, ...args) => {
    log(debugStyle(message, args));
};

const error = (message, err) => {
    log(errorStyle(message, err));
};

module.exports = { debug, info, error };
