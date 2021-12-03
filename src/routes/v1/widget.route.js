const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations/user.validation');
const userController = require('../../controllers/user.controller');
const widgetController = require('../../controllers/widget.controller');

const router = express.Router();

router  
  .route('/')
  .post(widgetController.createWidget)
  .get(widgetController.getWidgets);

router
  .route('/:widgetId')
  .get(widgetController.getWidget)
  .patch(widgetController.updateWidget)
  .delete(widgetController.deleteWidget);


module.exports = router;
