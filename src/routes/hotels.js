const express = require('express');
const hotelList = require('../../data/hotels');

const hotelRouter = express.Router();

hotelRouter.route('/hotel')
	.get((req, res) => {
		res.send({ data: hotelList });
	});

module.exports = hotelRouter;