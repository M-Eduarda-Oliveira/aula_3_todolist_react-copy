import { useState } from "react";
import TaskItem from "../components/TaskItem";

export default function TodoList() {
  const initialTasks = [1, 2, 3, 4, 5, 6].map((i) => ({
    id: i,
    title: `Task ${i}`,
    completed: i % 2 === 0,
  }));

  const [tasks, setTasks] = useState(initialTasks);

  const [newTitleTask, setNewTitleTask] = useState("");

  const [search, setSearch] = useState('')

  const searchTasks = tasks.filter(task => task.title.toLowerCase().includes(search.toLowerCase()));

  const handleNewTitleChange = (e) => {
    setNewTitleTask(e.target.value);
  };

  const handleAddNewTask = () => {
    const newTask = {
      id: new Date().getTime(),
      title: newTitleTask,
      completed: false,
    };

    setTasks([...tasks, newTask]);

    setNewTitleTask("");
  };

  const handleUpdateTask = (updatedTask) => {
    setTasks([...tasks.filter((t) => t.id !== updatedTask.id), updatedTask]);
  };

  const handleDeleteTask = (taskId) => {
    setTasks([...tasks.filter((task) => task.id !== taskId)]);
  };


  return (
    <div className="container">
      <p>
        <label htmlFor="new-task">Add Item</label>
        <input
          data-testid="newTaskTitle"
          id="new-task"
          type="text"
          value={newTitleTask}
          onChange={handleNewTitleChange}
        />
        <button onClick={handleAddNewTask}>Add</button>
      </p>
      <h3>Todo</h3>
      <ul id="incomplete-tasks">

        <input type="search" value={search} onChange={(e) => setSearch(e.target.value)}/>
        
        {!searchTasks ? tasks 
          .filter((task) => !task.completed)
          .map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onUpdateTask={handleUpdateTask}
              onDeleteTask={handleDeleteTask}
            />
          )): searchTasks
            .filter((task) => !task.completed)
            .map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onUpdateTask={handleUpdateTask}
                onDeleteTask={handleDeleteTask}
              />
          ))}
      </ul>
      <h3>Completed</h3>
      <ul id="completed-tasks">
        {tasks
          .filter((task) => task.completed)
          .map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onUpdateTask={handleUpdateTask}
              onDeleteTask={handleDeleteTask}
            />
          ))}
      </ul>
    </div>
  );
}
