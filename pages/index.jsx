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
      <div className="inner-conainter">

      <div className="add-item-container">
        <div className="add-item">
          <label htmlFor="new-task">Add Item</label>
          <input
            data-testid="newTaskTitle"
            id="new-task"
            type="text"
            value={newTitleTask}
            onChange={handleNewTitleChange}
          />
        </div>
        <button onClick={handleAddNewTask}>Add</button>
      </div>
      <div className="todo-container">
      <h3>Todo</h3>

        <div className="search-bar">
          <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="50px" height="50px"><path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"/></svg>
          <input type="search" value={search} placeholder="Search" onChange={(e) => setSearch(e.target.value)}/>
        </div>
      <ul id="incomplete-tasks">
        <div>
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

        </div>
      </ul>
      </div>
      <div className="completed-container">
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
      </div>
    </div>
  );
}
