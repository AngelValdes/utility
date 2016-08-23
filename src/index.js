// console colors
const chalk = require('chalk');

// date time functionality
const datetime = new Date();

// log levels
const levels = [
    { level: 0, type: 'information', color: 'blue' },
    { level: 1, type: 'warning', color: 'yellow' },
    { level: 2, type: 'error', color: 'red' }
];
exports.debug = function (message, level) {
    var result = message + ' not printed';
    if (global.DEBUG === true) {
        // write to console message in color
        switch (levels[level].color) {
            case 'blue':
                console.log(chalk.blue.bgWhite(message));
                result = message + ' printed as ' + levels[level].type;
                break;
            case 'yellow':
                console.warn(chalk.yellow.bgWhite(message));
                result = message + ' printed as ' + levels[level].type;
                break;
            case 'red':
                console.error(chalk.red.bgWhite(message));
                result = message + ' printed as ' + levels[level].type;
                break;
            default:
                break;
        }
    }
    return result;
};
exports.versionUp = function versionUp(current, type) { //expected usage: logger.versionUp("1.0.2", "Major")
    var result;
    var arrayOfNumbers = current.split('.');
    switch (type) {
        case 'Major':
            result = String(parseInt(arrayOfNumbers[0]) + 1) + "." + arrayOfNumbers[1] + "." + arrayOfNumbers[2];
            break;
        case 'Minor':
            result = arrayOfNumbers[0] + "." + String(parseInt(arrayOfNumbers[1]) + 1) + "." + arrayOfNumbers[2];
            break;
        case 'Patch':
            result = arrayOfNumbers[0] + "." + arrayOfNumbers[1] + "." + String(parseInt(arrayOfNumbers[2]) + 1);
            break;
        default:
            result = "Invalid input arguments";
    }
    return result;
};
