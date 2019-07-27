const consts = require('../configs/consts');
const dbconfig = require('../configs/global/db_config');

function isDevelopEnvironment() {
    return process.env.DEV_ENVIRONMENT === consts.develop;
}

function getDBConfig() {
    return isDevelopEnvironment() ? dbconfig.development : dbconfig.production;
}

function getDBPort() {
    return process.env.PORT || consts.defaultPort;
}

function isUsingMockData() {
    return parseInt(process.env.MOCK_DATA, 10) === 1;
}

module.exports = {
    isDevelopEnvironment,
    getDBConfig,
    getDBPort,
    isUsingMockData
}
