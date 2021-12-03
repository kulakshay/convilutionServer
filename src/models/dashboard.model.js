const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const dashboardWidgetSchema = mongoose.Schema(
  {
    x: {
      type: Number,
      required: true,
    },
    y: {
      type: Number,
      required: true,
    },
    w: {
      type: Number,
      required: true,
    },
    h: {
      type: Number,
      required: true,
    },
    widgetId: {
      type: String,
      required: true,
    },
  }
);
const dashboardSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    widgets: {
      type: [dashboardWidgetSchema],
      required: true,
    }
  },
  {
    timestamps: true,
  }
)
// add plugin that converts mongoose to json
dashboardSchema.plugin(toJSON);
dashboardSchema.plugin(paginate);

dashboardSchema.pre('save', async function (next) {
  const widget = this;
  next();
});

/**
 * @typedef Dashboard
 */
const Dashboard = mongoose.model('Dashboards', dashboardSchema);

module.exports = Dashboard;
