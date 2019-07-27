var log4js = require('log4js');

module.exports = {
    logError: (msgError) => {
        log4js.configure({
            appenders: {
              out: { type: 'stdout' },
              app: { type: 'file', filename: './logs/error.log' }
            },
            categories: {
              default: { appenders: [ 'out', 'app' ], level: 'error' }
            }
          });

        var loggererror = log4js.getLogger('error');
        loggererror.error(msgError);
    }
};
