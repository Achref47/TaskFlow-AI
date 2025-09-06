const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const pool = require('../db');
const dotenv = require('dotenv');

dotenv.config();

// Middleware to verify JWT token and get user ID
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: 'Unauthorized: No token provided.' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized: Invalid or expired token.' });
    }
};

// ------------------- Projects -------------------

// Create new project
router.post('/', verifyToken, async (req, res) => {
    const { name, description } = req.body;
    try {
        const [result] = await pool.execute(
            'INSERT INTO projects (user_id, name, description) VALUES (?, ?, ?)',
            [req.userId, name, description]
        );
        res.status(201).json({ message: 'Project created successfully!', projectId: result.insertId });
    } catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({ error: 'Failed to create project.' });
    }
});

// Get all projects for authenticated user
router.get('/', verifyToken, async (req, res) => {
    try {
        const [projects] = await pool.execute('SELECT * FROM projects WHERE user_id = ?', [req.userId]);

        // Attach tasks to each project
        for (let project of projects) {
            const [tasks] = await pool.execute('SELECT * FROM tasks WHERE project_id = ?', [project.id]);
            project.tasks = tasks;
        }

        res.status(200).json(projects);
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ error: 'Failed to retrieve projects.' });
    }
});

// ------------------- Tasks -------------------

// Get all tasks for a specific project
router.get('/:projectId/tasks', verifyToken, async (req, res) => {
    const { projectId } = req.params;
    try {
        const [project] = await pool.execute('SELECT user_id FROM projects WHERE id = ?', [projectId]);
        if (project.length === 0 || project[0].user_id !== req.userId) {
            return res.status(403).json({ error: 'Forbidden: You do not have access to this project.' });
        }

        const [tasks] = await pool.execute('SELECT * FROM tasks WHERE project_id = ?', [projectId]);
        res.status(200).json(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ error: 'Failed to fetch tasks.' });
    }
});

// Create a new task in a project
router.post('/:projectId/tasks', verifyToken, async (req, res) => {
    const { projectId } = req.params;
    const { description, status, priority, due_date } = req.body;

    try {
        const [project] = await pool.execute('SELECT user_id FROM projects WHERE id = ?', [projectId]);
        if (project.length === 0 || project[0].user_id !== req.userId) {
            return res.status(403).json({ error: 'Forbidden: You do not have access to this project.' });
        }

        const [result] = await pool.execute(
            'INSERT INTO tasks (project_id, description, status, priority, due_date) VALUES (?, ?, ?, ?, ?)',
            [projectId, description, status, priority, due_date]
        );
        res.status(201).json({ message: 'Task created successfully!', taskId: result.insertId });
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ error: 'Failed to create task.' });
    }
});

// Update a task (e.g., toggle completion)
router.put('/tasks/:taskId', verifyToken, async (req, res) => {
    const { taskId } = req.params;
    const { description, status, priority, due_date, completed } = req.body;

    try {
        const [task] = await pool.execute('SELECT project_id FROM tasks WHERE id = ?', [taskId]);
        if (task.length === 0) return res.status(404).json({ error: 'Task not found.' });

        const [project] = await pool.execute('SELECT user_id FROM projects WHERE id = ?', [task[0].project_id]);
        if (project[0].user_id !== req.userId) return res.status(403).json({ error: 'Forbidden: Not allowed.' });

        await pool.execute(
            'UPDATE tasks SET description = ?, status = ?, priority = ?, due_date = ?, completed = ? WHERE id = ?',
            [description || task[0].description, status || task[0].status, priority || task[0].priority, due_date || task[0].due_date, completed ?? task[0].completed, taskId]
        );
        res.status(200).json({ message: 'Task updated successfully.' });
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ error: 'Failed to update task.' });
    }
});

// Delete a task
router.delete('/tasks/:taskId', verifyToken, async (req, res) => {
    const { taskId } = req.params;

    try {
        const [task] = await pool.execute('SELECT project_id FROM tasks WHERE id = ?', [taskId]);
        if (task.length === 0) return res.status(404).json({ error: 'Task not found.' });

        const [project] = await pool.execute('SELECT user_id FROM projects WHERE id = ?', [task[0].project_id]);
        if (project[0].user_id !== req.userId) return res.status(403).json({ error: 'Forbidden: Not allowed.' });

        await pool.execute('DELETE FROM tasks WHERE id = ?', [taskId]);
        res.status(200).json({ message: 'Task deleted successfully.' });
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ error: 'Failed to delete task.' });
    }
});

module.exports = router;
