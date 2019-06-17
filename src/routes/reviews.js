const express = require('express');
const reviewList = require('../../data/reviews');

const reviewRouter = express.Router();

reviewRouter.route('/review')
	.get((req, res) => {
		res.send({ data: reviewList });
	});

module.exports = reviewRouter;