const httpStatus = require('http-status');
const { Dashboard } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a dashboard
 * @param {Object} dashboardBody
 * @returns {Promise<Dashboard>}
 */
const createDashboard = async (dashboardBody) => {
  return Dashboard.create(dashboardBody);
};

/**
 * Query for Dashboards
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryDashboard = async (filter, options) => {
  const dashboards = await Dashboard.paginate(filter, options);
  return dashboards;
};

/**
 * Get Dashboard by id
 * @param {ObjectId} id
 * @returns {Promise<Dashboard>}
 */
const getDashboardById = async (id) => {
  return Dashboard.findById(id);
};


/**
 * Update dashboard by id
 * @param {ObjectId} dashboardId
 * @param {Object} updateBody
 * @returns {Promise<Dashboard>}
 */
const updateDashboardById = async (dashboardId, updateBody) => {
  const dashboard = await getDashboardById(dashboardId);
  if (!dashboard) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Dashboard not found');
  }
  Object.assign(dashboard, updateBody);
  await dashboard.save();
  return dashboard;
};

/**
 * Delete dashboard by id
 * @param {ObjectId} dashboardId
 * @returns {Promise<Dashboard>}
 */
const deleteDashboardById = async (dashboardId) => {
  const dashboard = await getDashboardById(dashboardId);
  if (!dashboard) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Dashboard not found');
  }
  await dashboard.remove();
  return dashboard;
};

module.exports = {
  createDashboard,
  queryDashboard,
  getDashboardById,
  updateDashboardById,
  deleteDashboardById,
};
