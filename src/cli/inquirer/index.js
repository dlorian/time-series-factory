const inquirer = require('inquirer');
const questions = require('./questions');
const log = require('../../logger');

const prompt = (resolve, reject) => {
    log.info(
        'Welcome to ts-factory-cli. You are able to create a time series now.'
    );

    inquirer
        .prompt(questions)
        .then(answers => {
            resolve(answers);
        })
        .catch(reject);
};

const run = () => new Promise(prompt);

module.exports = { run };
