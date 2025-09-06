import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Navbar from '../header/Navbar';
import backgroundImage from '../Assets/bg3.jpg';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDescription, setNewProjectDescription] = useState('');
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  
  // New state variables for advanced task form
  const [newTask, setNewTask] = useState({
    description: '',
    status: 'To Do',
    priority: 'Low',
    dueDate: ''
  });

  const [searchTerm, setSearchTerm] = useState('');
  
  // State variables for sorting and filtering
  const [sortBy, setSortBy] = useState('created_at');
  const [sortDirection, setSortDirection] = useState('asc');
  const [filterByStatus, setFilterByStatus] = useState('All');
  const [filterByPriority, setFilterByPriority] = useState('All');

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/projects', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
      toast.error("Failed to fetch projects. Please log in again.");
      navigate('/login');
    }
  };

  const fetchTasks = async (projectId) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/projects/${projectId}/tasks`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast.error("Failed to fetch tasks.");
    }
  };

  const createProject = async (e) => {
    e.preventDefault();
    if (!newProjectName.trim() || !newProjectDescription.trim()) {
      toast.error("Both project name and description are required.");
      return;
    }
    try {
      await axios.post('http://localhost:3001/api/projects', 
        { name: newProjectName, description: newProjectDescription },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewProjectName('');
      setNewProjectDescription('');
      fetchProjects();
      toast.success("Project created successfully!");
    } catch (error) {
      console.error("Error creating project:", error);
      toast.error("Failed to create project.");
    }
  };

  const openTasksModal = (project) => {
    setSelectedProject(project);
    fetchTasks(project.id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
    setTasks([]);
    setNewTask({ description: '', status: 'To Do', priority: 'Low', dueDate: '' });
    setSortBy('created_at');
    setSortDirection('asc');
    setFilterByStatus('All');
    setFilterByPriority('All');
  };

  const createTask = async (e) => {
    e.preventDefault();
    if (!newTask.description.trim() || !selectedProject) {
      toast.error("Task description cannot be empty.");
      return;
    }
    try {
      await axios.post(`http://localhost:3001/api/projects/${selectedProject.id}/tasks`, 
        { 
          description: newTask.description,
          status: newTask.status,
          priority: newTask.priority,
          due_date: newTask.dueDate
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewTask({ description: '', status: 'To Do', priority: 'Low', dueDate: '' });
      fetchTasks(selectedProject.id);
      toast.success("Task created successfully!");
    } catch (error) {
      console.error("Error creating task:", error);
      toast.error("Failed to create task.");
    }
  };

  const toggleTaskCompletion = async (taskId, makeDone) => {
  try {
    await axios.put(`http://localhost:3001/api/tasks/${taskId}/status`, 
      { status: makeDone ? 'Done' : 'To Do' }, // <-- update status, not completed
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchTasks(selectedProject.id);
  } catch (error) {
    console.error("Error updating task:", error);
    toast.error("Failed to update task.");
  }
};


  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:3001/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchTasks(selectedProject.id);
      toast.success("Task deleted!");
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task.");
    }
  };

  const filteredProjects = projects.filter(project => 
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sorting and Filtering Logic
  const sortedAndFilteredTasks = tasks
    .filter(task => 
      (filterByStatus === 'All' || task.status === filterByStatus) &&
      (filterByPriority === 'All' || task.priority === filterByPriority)
    )
    .sort((a, b) => {
      if (sortBy === 'created_at') {
        return sortDirection === 'asc' ? new Date(a.created_at) - new Date(b.created_at) : new Date(b.created_at) - new Date(a.created_at);
      }
      if (sortBy === 'priority') {
        const priorityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
        return sortDirection === 'asc' ? priorityOrder[a.priority] - priorityOrder[b.priority] : priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      if (sortBy === 'due_date') {
        return sortDirection === 'asc' ? new Date(a.due_date) - new Date(b.due_date) : new Date(b.due_date) - new Date(a.due_date);
      }
      return 0;
    });

  return (
    <div className="min-h-screen relative overflow-hidden">
      <img src={backgroundImage} alt="Background" className="absolute inset-0 h-full w-full object-cover z-0" />
      <div className="absolute inset-0 bg-black/50 z-10"></div>

      <div className="relative z-20">
        <Navbar />
        <div className="container mx-auto p-8">
          <div className="max-w-6xl mx-auto mt-12 p-10 bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20">
            <h1 className="text-4xl font-bold mb-6 text-center text-white">My Projects 📁</h1>

            {/* Add Project Form */}
            <form onSubmit={createProject} className="flex flex-col gap-4 mb-8">
              <input
                type="text"
                className="p-3 rounded-md bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="Project Name..."
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
              />
              <textarea
                className="p-3 rounded-md bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none"
                placeholder="Project Description..."
                rows="3"
                value={newProjectDescription}
                onChange={(e) => setNewProjectDescription(e.target.value)}
              />
              <button type="submit" className="bg-pink-600 text-white py-3 px-6 rounded-md font-semibold hover:bg-pink-700 transition duration-300">
                Add Project
              </button>
            </form>

            {/* Search */}
            <input
              type="text"
              className="w-full p-3 rounded-md bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Projects List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.length > 0 ? (
                filteredProjects.map(project => (
                  <div key={project.id} onClick={() => openTasksModal(project)} className="bg-white/20 p-6 rounded-lg shadow-md hover:bg-white/30 transition duration-300 cursor-pointer">
                    <h3 className="text-xl font-semibold text-white mb-2">{project.name}</h3>
                    <p className="text-gray-300 text-sm overflow-hidden text-ellipsis whitespace-nowrap">{project.description}</p>
                  </div>
                ))
              ) : (
                <p className="text-center col-span-full text-gray-400">No projects found. Create one to get started!</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Task Modal */}
      {isModalOpen && selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-8 w-full max-w-2xl border border-white/20 relative">
            <button onClick={closeModal} className="absolute top-4 right-4 text-white text-3xl hover:text-gray-300">&times;</button>
            <h2 className="text-3xl font-bold mb-2 text-white">{selectedProject.name}</h2>
            <p className="text-gray-300 mb-6">{selectedProject.description}</p>

            {/* Add Task Form with advanced fields */}
            <form onSubmit={createTask} className="flex flex-col gap-4 mb-6">
              <input
                type="text"
                className="p-3 rounded-md bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Task description..."
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              />
              <div className="flex gap-4">
                <select
                  className="flex-grow p-3 rounded-md bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newTask.status}
                  onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
                >
                  <option className="bg-gray-800" value="To Do">To Do</option>
                  <option className="bg-gray-800" value="In Progress">In Progress</option>
                  <option className="bg-gray-800" value="Done">Done</option>
                </select>
                <select
                  className="flex-grow p-3 rounded-md bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newTask.priority}
                  onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                >
                  <option className="bg-gray-800" value="Low">Low</option>
                  <option className="bg-gray-800" value="Medium">Medium</option>
                  <option className="bg-gray-800" value="High">High</option>
                </select>
                <input
                  type="date"
                  className="p-3 rounded-md bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                />
              </div>
              <button type="submit" className="bg-blue-600 text-white py-3 px-6 rounded-md font-semibold hover:bg-blue-700 transition duration-300">
                Add Task
              </button>
            </form>

            {/* Sorting & Filtering Controls */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="text-gray-300 font-semibold">Sort by:</span>
              <select
                className="p-2 rounded-md bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option className="bg-gray-800" value="created_at">Date Created</option>
                <option className="bg-gray-800" value="priority">Priority</option>
                <option className="bg-gray-800" value="due_date">Due Date</option>
              </select>
              <select
                className="p-2 rounded-md bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={sortDirection}
                onChange={(e) => setSortDirection(e.target.value)}
              >
                <option className="bg-gray-800" value="asc">Ascending</option>
                <option className="bg-gray-800" value="desc">Descending</option>
              </select>
              <span className="text-gray-300 font-semibold ml-auto">Filter:</span>
              <select
                className="p-2 rounded-md bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filterByStatus}
                onChange={(e) => setFilterByStatus(e.target.value)}
              >
                <option className="bg-gray-800" value="All">All Statuses</option>
                <option className="bg-gray-800" value="To Do">To Do</option>
                <option className="bg-gray-800" value="In Progress">In Progress</option>
                <option className="bg-gray-800" value="Done">Done</option>
              </select>
              <select
                className="p-2 rounded-md bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filterByPriority}
                onChange={(e) => setFilterByPriority(e.target.value)}
              >
                <option className="bg-gray-800" value="All">All Priorities</option>
                <option className="bg-gray-800" value="Low">Low</option>
                <option className="bg-gray-800" value="Medium">Medium</option>
                <option className="bg-gray-800" value="High">High</option>
              </select>
            </div>

            {/* Tasks List */}
            <div className="space-y-4 max-h-80 overflow-y-auto">
              {sortedAndFilteredTasks.length > 0 ? (
                sortedAndFilteredTasks.map(task => (
                  <div key={task.id} className="bg-white/20 p-4 rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-3">
                     <input
  type="checkbox"
  checked={task.status === 'Done'} // <-- checkbox checked if status is 'Done'
  onChange={() => toggleTaskCompletion(task.id, task.status !== 'Done')} // toggle status
  className="h-5 w-5 text-blue-600 rounded"
/>

                      <div className="flex flex-col">
                        <span className={`text-white text-lg ${task.completed ? 'line-through opacity-60' : ''}`}>
                          {task.description}
                        </span>
                        <div className="text-sm text-gray-300">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            task.status === 'To Do' ? 'bg-blue-500' :
                            task.status === 'In Progress' ? 'bg-yellow-500' : 'bg-green-500'
                          }`}>
                            {task.status}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ml-2 ${
                            task.priority === 'High' ? 'bg-red-500' :
                            task.priority === 'Medium' ? 'bg-orange-500' : 'bg-green-500'
                          }`}>
                            {task.priority}
                          </span>
                          {task.due_date && <span className="ml-2">Due: {new Date(task.due_date).toLocaleDateString()}</span>}
                        </div>
                      </div>
                    </div>
                    <button onClick={() => deleteTask(task.id)} className="text-red-400 hover:text-red-500 transition duration-300">
                      &times;
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-400">No tasks found. Add a new one!</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;