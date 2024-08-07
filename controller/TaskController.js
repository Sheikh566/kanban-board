const Task = require('../model/TaskModel');

const createTask = async (req, res) => {
  try {
    const { title, text, status, color } = req.body;
    if (!title || !status) {
      return res.status(400).json({ message: 'title or status missing in body' });
    }
    if (!['todo', 'in-progress', 'done'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    const task = new Task({
      title,
      text: text || 'Add a description',
      status,
      user: req.user.id,
      color: color || '#ffffcc' // cream
    });
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: 'Error creating task', error: error.message });
  }
};

const getTasks = async (req, res) => {
  try {
    const where = { user: req.user.id };
    if (req.query.status) {
      if (!['todo', 'in-progress', 'done'].includes(req.query.status)) {
        return res.status(400).json({ message: 'Invalid status' });
      }
      where['status'] = req.query.status;
    }
    const tasks = await Task.find(where);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const { title, text, status, color } = req.body;
    if (!title || !status || !color) {
      return res.status(400).json({ message: 'Some fields are missing in the body' });
    }
    if (!['todo', 'in-progress', 'done'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user.id
    });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    task.title = title;
    task.text = text || '';
    task.status = status;
    task.color = color;
    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Error updating task', error: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const deleteRes = await Task.deleteOne({ _id: req.params.id, user: req.user.id });
    return deleteRes.deletedCount === 0
      ? res.status(404).json({ message: 'Task not found' })
      : res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task', error: error.message });
  }
};

module.exports = { createTask, getTasks, updateTask, deleteTask };