import { useState } from 'react';

function TaskManager() {
    const [tasks, setTasks] = useState([
        { id: 1, text: 'Learn React basics', completed: true },
        { id: 2, text: 'Practice useState hook', completed: false },
        { id: 3, text: 'Build task manager app', completed: false }
    ]);

    const [newTask, setNewTask] = useState('');

    function addTask(e) {
        e.preventDefault();
        if (newTask.trim() === '') return;

        const task = {
            id: Date.now(),
            text: newTask,
            completed: false
        };

        setTasks([...tasks, task]);
        setNewTask('');
    }

    function toggleTask(id) {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    }

    function deleteTask(id) {
        setTasks(tasks.filter(task => task.id !== id));
    }

    return (
        <div className="card">
            <h3>Task Manager</h3>
            
            <form onSubmit={addTask} className="form">
                <div className="row">
                    <input
                        type="text"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        placeholder="Enter a new task"
                        style={{ flex: 1 }}
                    />
                    <button type="submit">Add Task</button>
                </div>
            </form>

            <ul className="list">
                {tasks.map(task => (
                    <li key={task.id} className="list-item">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => toggleTask(task.id)}
                            />
                            <span style={{ 
                                textDecoration: task.completed ? 'line-through' : 'none',
                                color: task.completed ? '#6b7280' : '#000'
                            }}>
                                {task.text}
                            </span>
                        </div>
                        <button 
                            onClick={() => deleteTask(task.id)}
                            className="danger"
                            style={{ fontSize: '12px', padding: '5px 10px' }}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>

            <p className="muted">
                Mini interactive app using state. Click checkbox to toggle, delete to remove.
            </p>
        </div>
    );
}

export default TaskManager;