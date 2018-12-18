const inquirer = require('./inquirer');
const commander = require('./commander');

const log = require('../logger.js');

const execute = (cliRunner, callback) => {
    log.debug(`Running ${cliRunner} cli`);
    
    cliRunner.run()
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