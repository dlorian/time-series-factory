const log = require('../../logger');

module.exports = [
    {
        type: 'input',
        name: 'start',
        message: 'When should it start (YYYY-MM-DD)?'
    },
    {
        type: 'input',
        name: 'end',
        message: 'When should it end (YYYY-MM-DD)?'
    },
    {
        type: 'list',
        name: 'granularity',
        message: 'Which granularity do you like?',
        choices: ['15min', '1h', '1d'],
        default: ['1h']
    },
    {
        type: 'list',
        name: 'format',
        message: 'Which format do you prefer?',
        choices: ['json', 'xml', 'csv'],
        default: ['json']
    },
    {
        type: 'input',
        name: 'output',
        message: 'Finally, give it a name!'
    },
    {
        type: 'confirm',
        name: 'confirm',
        message: 'Pleas confirm',
        when: answers => {
            log.info(
                `You like to create a time series from '${answers.start}' to '${
                    answers.start
                }' with a granularity of '${
                    answers.granularity
                }'. This should be stored to file '${answers.output}' as '${
                    answers.format
                }'. Is this correct?`
            );
            return true;
        }
    }
];
