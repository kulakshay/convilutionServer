const httpStatus = require('http-status');
const { Widget } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a widget
 * @param {Object} widgetBody
 * @returns {Promise<Widget>}
 */
const createWidget = async (widgetBody) => {
  return Widget.create(widgetBody);
};

/**
 * Query for widgets
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryWidgets = async (filter, options) => {
  const widgets = await Widget.paginate(filter, options);
  return widgets;
};

/**
 * Get widget by id
 * @param {ObjectId} id
 * @returns {Promise<Widget>}
 */
const getWidgetById = async (id) => {
  return Widget.findById(id);
};


/**
 * Update widget by id
 * @param {ObjectId} widgetId
 * @param {Object} updateBody
 * @returns {Promise<Widget>}
 */
const updateWidgetById = async (widgetId, updateBody) => {
  const widget = await getWidgetById(widgetId);
  if (!widget) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Widget not found');
  }
  Object.assign(widget, updateBody);
  await widget.save();
  return widget;
};

/**
 * Delete widget by id
 * @param {ObjectId} widgetId
 * @returns {Promise<Widget>}
 */
const deleteWidgetById = async (widgetId) => {
  const widget = await getWidgetById(widgetId);
  if (!widget) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Widget not found');
  }
  await widget.remove();
  return widget;
};

module.exports = {
  createWidget,
  queryWidgets,
  getWidgetById,
  updateWidgetById,
  deleteWidgetById,
};
