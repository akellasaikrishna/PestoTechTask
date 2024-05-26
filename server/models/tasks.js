const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const TasksSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: true,
  },
  description: {
    type: String,
    trim: true,
    required: false,
  },
  status: {
    type: String,
    trim: true,
    required: true,
  },
  created: {
    type: String,
    trim: true,
    required: true,
  },
  updated: {
    type: String,
    trim: true,
    required: false,
  },
});
module.exports = mongoose.model("Task", TasksSchema);
