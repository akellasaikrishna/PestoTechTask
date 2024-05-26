const express = require("express");
const taskController = require("../controllers/tasks");

const router = express.Router();
router.post("/create", taskController.create);
router.post("/getAllTasks", taskController.getAll);
router.post("/delete", taskController.deleteById);
router.post("/update", taskController.updateById);
module.exports = router;
