const inquirer = require('./inquirer');
const commander = require('./commander/program.js');

const log = require('../logger.js');

const execute = (cli, callback) => {
    log.debug(`Running ${cli} cli`);
    cli.run()
        .then(callback)
        .catch(err => {
            log.error('Something unexpected happend. We are sooo sorry.', err);
            process.exit(1);
        });
};

module.exports = {
    commander: {
        run: (callback) => execute(commander, callback)
    },
    inquirer: {
        run: (callback) => execute(inquirer, callback)
    }
};