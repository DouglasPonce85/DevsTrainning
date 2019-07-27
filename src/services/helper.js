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

function getErrorStackInfo(err) {
	const stack = err.stack || '';
	return stack.split('\n').map(line => line.trim());
}

function controllerErrorRaised(methodName, err, errorType, next) {
	const source = `Error @ method [ ${methodName}() ]`;
	const stackInfo = getErrorStackInfo(err);

	next({
		message: err,
		errorType,
		source,
		stackInfo
	});
}

module.exports = {
    isDevelopEnvironment,
    getDBConfig,
    getDBPort,
    isUsingMockData,
    controllerErrorRaised
}
