import { useState } from 'react';

function TaskInput({ onAddTask }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onAddTask(inputValue);
      setInputValue('');
    }
  };

  return (
    <form className="task-input" onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter a new task..."
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskInput;