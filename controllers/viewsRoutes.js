const express = require('express');
const viewsRouter = express.Router();
const viewsController = require('../controllers/viewsController');

viewsRouter.get('/overview', viewsController.getOverview);
viewsRouter.get('/course', viewsController.getCourse);

module.exports = viewsRouter;