const express = require('express');
const coffeList = require('../../data/coffeshops');

const coffeeRouter = express.Router();

coffeeRouter.route('/coffee')
	.get((req, res) => {
		res.send({ data: coffeList });
	});

module.exports = coffeeRouter;