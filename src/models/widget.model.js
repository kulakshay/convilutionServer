const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

const widgetSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
    },
    chart: {
      type: String,
      required: true,
    },
    xaxis: {
      type: [String],
      require: true,
    },
    yaxis: {
      type: [String],
      require: true,
    },
    zaxis: {
      type: [String],
    },
    filter: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
widgetSchema.plugin(toJSON);
widgetSchema.plugin(paginate);

widgetSchema.pre('save', async function (next) {
  const widget = this;
  next();
});

/**
 * @typedef Widget
 */
const Widget = mongoose.model('Widgets', widgetSchema);

module.exports = Widget;
