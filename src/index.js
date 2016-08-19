const chalk = require('chalk');
const file = require('file-system');

const debug = (msg, obj = null, status = null) => {

// checking if debug is true
  if (process.env.DEBUG) {
    // defining dates and times
    const date = new Date(),
        days = [ 'Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat' ],
        day = date.getDay(),
        d = date.getDate(),
        mo = date.getMonth() + 1,
        y = date.getFullYear(),
        h = date.getHours(),
        min = date.getMinutes(),
        s = date.getSeconds(),
        ms = date.getMilliseconds(),
        suf = h < 12 ? 'AM' : 'PM';

        // printing to console
    console.log();
    console.log(chalk.bgRed(chalk.dim(days[day] + ' ' + ((h + 11) % 12 + 1) + ':' + (min < 10 ? '0' : '') + min + ':' + (s < 10 ? '0' : '') + s + ' ' + suf)));
    console.log(chalk.bgGreen((status ? status + ' - ' : '') + chalk.bold(msg)));
    if (obj && (obj.length > 0 || Object.keys(obj).length > 0)) {
      console.log(chalk.bgBlue(chalk.black(JSON.stringify(obj, null, 2))));
    }
    console.log();

    // logging to file
    let pretty = date + '\n';
    pretty += (status ? status + ' - ' : '') + msg + '\n';
    if (obj && (obj.length > 0 || Object.keys(obj).length > 0)) {
      pretty += JSON.stringify(obj, null, 2) + '\n';
    }
    pretty += '\n';
    file.appendFile('log/console.log', pretty, (err) => {
      if (err) {
        console.log(chalk.red(error));
      }
    });

  }
};
