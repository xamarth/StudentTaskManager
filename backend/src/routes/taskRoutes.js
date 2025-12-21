const express = require("express");
const router = express.Router();
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getOverdueTasks,
} = require("../controllers/taskController");
const auth = require("../middleware/auth");

router.use(auth);
router.post("/", createTask);
router.get("/", getTasks);
router.get("/overdue", getOverdueTasks);
router.get("/:id", getTaskById);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
