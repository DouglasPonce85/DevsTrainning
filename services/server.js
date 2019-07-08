const consts = require('../configs/consts');
const chalk = require('chalk');
const debug = require('debug')('app');
const helper = require('./helper');

module.exports = {
    runServer: (app) => {
        const serverPort = helper.getDBPort();
        app.listen(serverPort, () => {
            debug(`Listening @ port ${chalk.yellow(serverPort)}`);
        });
    }
}
