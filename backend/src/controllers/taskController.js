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
      completed: false,
      // ...req.body,
      userId: req.user.id,
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

    const tasks = await Task.find({ userId: req.user.id, ...filter });
    tasks.sort((a, b) => b.createdAt - a.createdAt);

    // if (sort === "dueDate") sortOption = { dueDate: 1 };
    // if (sort === "priority") {
    //   sortOption = {
    //     priority: { $cond: [{ $eq: ["$priority", "high"] }, 1, 2] },
    //   };
    // }

    if (sort === "priority") {
      const order = { high: 1, medium: 2, low: 3 };
      tasks.sort((a, b) => order[a.priority] - order[b.priority]);
    }

    if (sort === "dueDate") {
      tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    }

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/tasks/:id
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ message: "Invalid task ID" });
  }
};

// PUT /api/tasks/:id
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      // req.params.id,
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
    const task = await Task.findOneAndDelete(
      { _id: req.params.id, userId: req.user.id },
      // req.params.id,
    );
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Invalid task ID" });
  }
};
