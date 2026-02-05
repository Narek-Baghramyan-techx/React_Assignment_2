import TaskInput from "./components/TaskInput"
import TodoItem from "./components/TodoItem"
import AddTask from "./components/AddTask"
import EditTask from "./components/EditTask"
import { useState } from "react"

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [tasks, setTasks] = useState([
    {
      "id": 1,
      "text": "Doctors Appointment",
      "day": "Feb 5th at 2:30pm",
      "reminder": true
    },
    {
      "id": 2,
      "text": "Meeting at School",
      "day": "Feb 6th at 1:30pm",
      "reminder": false
    }
  ])

  //Add Task
  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000) + 1

    const newTask = { id, ...task }
    setTasks([...tasks, newTask])
  }

  //Delete the Task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id ))
  }

  //Edit the Task
  const editTask = (id) => {
    const taskToEdit = tasks.find(task => task.id === id)
    setEditingTask(taskToEdit)
  }

  //Update Task
  const updateTask = (updatedTask) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task))
    setEditingTask(null)
  }

  //Toggle Reminder
  const toggleReminder = (id) => {
    setTasks(tasks.map((task) => task.id === id ? {
      ...task, reminder: !task.reminder
    } : task ))
  }

  return (
    <div className="container">
      <TaskInput title='To-Do List App' onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
      {showAddTask && <AddTask onAdd={addTask}/>}
      {editingTask && <EditTask task={editingTask} onUpdate={updateTask} onCancel={() => setEditingTask(null)}/>}
      {tasks.length > 0 ? (
        <TodoItem tasks={tasks} onEdit={editTask} onDelete={deleteTask} onToggle={toggleReminder}/>
        ) : 'No anything to do'}
    </div>
  )
}

export default App
