const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { dashboardService } = require('../services');

const createDashboard = catchAsync(async (req, res) => {
  const dashboard = await dashboardService.createDashboard(req.body);
  res.status(httpStatus.CREATED).send(dashboard);
});

const getDashboards = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  if(!options.limit) options.limit = 200;
  const result = await dashboardService.queryDashboard(filter, options);

  res.send(result);
});

const getDashboard = catchAsync(async (req, res) => {
  const dashboard = await dashboardService.getDashboardById(req.params.dashboardId);
  if (!dashboard) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Dashboard not found');
  }
  res.send(dashboard);
});

const updateDashboard = catchAsync(async (req, res) => {
  const dashboard = await dashboardService.updateDashboardById(req.params.dashboardId, req.body);
  res.send(dashboard);
});

const deleteDashboard = catchAsync(async (req, res) => {
  await dashboardService.deleteDashboardById(req.params.dashboardId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createDashboard,
  getDashboards,
  getDashboard,
  updateDashboard,
  deleteDashboard,
};
