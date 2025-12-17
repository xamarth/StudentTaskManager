const Task = require("../models/task");

// POST /api/tasks
exports.createTask = async (req, res) => {
  try {
    const { title, description, priority, dueDate } = req.body;

    if (!title || !dueDate) {
      return res.status(400).json({ message: "Title and due date are required" });
    }

    const task = await Task.create({
      title,
      description,
      priority,
      dueDate,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/tasks
// Supports: ?status=pending|completed & ?sort=priority|dueDate
exports.getTasks = async (req, res) => {
  try {
    const { status, sort } = req.query;

    const filter = {};
    if (status === "pending") filter.completed = false;
    if (status === "completed") filter.completed = true;

    let sortOption = { createdAt: -1 };
    if (sort === "dueDate") sortOption = { dueDate: 1 };
    if (sort === "priority") {
      sortOption = {
        priority: { $cond: [{ $eq: ["$priority", "high"] }, 1, 2] },
      };
    }

    const tasks = await Task.find(filter).sort(sortOption);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/tasks/:id
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ message: "Invalid task ID" });
  }
};

// PUT /api/tasks/:id
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE /api/tasks/:id
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Invalid task ID" });
  }
};
