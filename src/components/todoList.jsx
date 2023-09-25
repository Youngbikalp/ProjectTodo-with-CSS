import React, { useState } from "react";
import "../styles/todoList.css";

function TodoList() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Checking Email", completed: false },
    { id: 2, title: "Read book for 30 min", completed: true },
    { id: 3, title: "Do Homework", completed: true },
  ]);

  const [editingTask, setEditingTask] = useState(null);

  const [newTaskTitle, setNewTaskTitle] = useState("");

  const addTask = (e) => {
    e.preventDefault();
    if (newTaskTitle.trim() === "") return;
    const newTask = {
      id: tasks.length + 1,
      title: newTaskTitle,
      completed: false,
    };
    setTasks(tasks.concat(newTask));
    setNewTaskTitle("");
  };

  const editTask = (task) => {
    setEditingTask(task.id);
  };

  const editInputChange = (e, taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, title: e.target.value } : task
    );
    setTasks(updatedTasks);
  };

  const editComplete = (task) => {
    setEditingTask(null);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  return (
    <div className="todo-list">
      <h1>Todo List</h1>
      <form onSubmit={addTask}>
        <input
          type="text"
          placeholder="Enter task title"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {editingTask === task.id ? (
              <input
                type="text"
                value={task.title}
                onChange={(e) => editInputChange(e, task.id)}
                onBlur={() => editComplete(task)}
              />
            ) : (
              <span className={task.completed ? "completed" : ""}>
                {task.title}
              </span>
            )}
            <button onClick={() => editTask(task)}>Edit</button>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
