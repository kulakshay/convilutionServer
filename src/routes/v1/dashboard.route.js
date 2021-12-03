const express = require('express');
const widgetController = require('../../controllers/widget.controller');
const dashboardController = require('../../controllers/dashboard.controller');

const router = express.Router();

router  
  .route('/')
  .post(dashboardController.createDashboard)
  .get(dashboardController.getDashboards);

router
  .route('/:dashboardId')
  .get(dashboardController.getDashboard)
  .patch(dashboardController.updateDashboard)
  .delete(dashboardController.deleteDashboard);


module.exports = router;
