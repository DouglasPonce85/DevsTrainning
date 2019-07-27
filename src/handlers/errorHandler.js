const consts = require('../configs/consts');

const logger = require('../utils/logger');

module.exports = {
	urlNotDefinedHandler: (err, res) => {
		res.status(403)
			.send({
				info: consts.urlNotDefinedErrorInfo,
				message: err.message
			});
	},
	controllerRaised: (err, res) => {
		logger.logError(err.stackInfo);
		res.status(403)
			.send({
				info: consts.controllerRaisedError,
				source: err.source,
				stackInfo: err.stackInfo
			});
	},
	DBErrorRaised: (err, res) => {
		logger.logError(err.stackInfo);
		res.status(405)
			.send({
				info: consts.controllerRaisedError,
				traceDB: 'Error on Data Base statement. Please review knex functions',
				stackInfo: err.stackInfo
			});
	},
	unexpectedErrorRaised: (err, res) => {
		res.status(403)
			.send({
				info: consts.controllerRaisedError,
				stackInfo: err.stackInfo
			});
	}
};