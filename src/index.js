// console colors
const chalk = require('chalk');

// date time functionality
const datetime = new Date();

// log levels
const levels = [
    { level: 0, type: 'information', color: 'blue' },
    { level: 1, type: 'warning', color: 'yellow' },
    { level: 2, type: 'error', color: 'red' },
];
exports.debug = function (message, level) {
    if (global.DEBUG === true) {
        // write to console message in color
        switch (levels[level].color) {
            case 'blue':
                console.log(chalk.blue.bgWhite(message));
                break;
            case 'yellow':
                console.warn(chalk.yellow.bgWhite(message));
                break;
            case 'red':
                console.error(chalk.red.bgWhite(message));
                break;
            default:
                console.log(chalk.blue.bgWhite(message));
        }
    }
};