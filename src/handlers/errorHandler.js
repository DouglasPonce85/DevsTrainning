const consts = require('../configs/consts');

module.exports = {
	urlNotDefinedHandler: (err, res) => {
		res.status(403)
			.send({
				info: consts.urlNotDefinedErrorInfo,
				message: err.message
			});
	},
	controllerRaised: (err, res) => {
		res.status(403)
			.send({
				info: consts.controllerRaisedError,
				source: err.source,
				stackInfo: err.stackInfo
			});
	},
	DBErrorRaised: (err, res) => {
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