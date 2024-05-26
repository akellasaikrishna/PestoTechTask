const TaskModel = require("../models/tasks");
module.exports = {
  getAll: function (req, res, next) {
    let taskList = [];
    TaskModel.find({})
      .then((tasks) => {
        for (let task of tasks) {
          taskList.push({
            id: task._id,
            title: task.title,
            description: task.description,
            status: task.status,
            created: task.created,
            updated: task.updated,
          });
        }
        res.status(200).json({
          status: "success",
          tasks: taskList,
        });
      })
      .catch((err) => {
        res.status(500).json({ message: err._message });
      });
  },
  updateById: function (req, res, next) {
    TaskModel.findByIdAndUpdate(req.body.id, {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      updated: req.body.updated,
    })
      .then(() => {
        res.status(200).json({ message: "Task updated succesfully" });
      })
      .catch((err) => {
        res.status(500).json({ message: err._message });
      });
  },
  deleteById: function (req, res, next) {
    TaskModel.findByIdAndDelete(req.body.id).then((data) => {
      res.json({
        status: "success",
        message: "Task deleted",
        data: null,
      });
    });
  },
  create: function (req, res, next) {
    TaskModel.create({
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      created: req.body.created,
    })
      .then(() => {
        res.status(200).json({ message: "Task created succesfully" });
      })
      .catch((err) => {
        res.status(500).json({ message: err._message });
      });
  },
};
