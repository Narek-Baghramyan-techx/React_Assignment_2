import TaskInput from "./components/TaskInput"
import TodoItem from "./components/TodoItem"
import AddTask from "./components/AddTask"
import EditTask from "./components/EditTask"
import FilterBar from "./components/FilterBar"
import { useState, useEffect } from "react"

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [filter, setFilter] = useState('all')
  const [darkMode, setDarkMode] = useState(false)
  const [tasks, setTasks] = useState([])

  // Cookie helper functions
  const setCookie = (name, value, days) => {
    const expires = new Date()
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
    document.cookie = `${name}=${JSON.stringify(value)};expires=${expires.toUTCString()};path=/`
  }

  const getCookie = (name) => {
    const nameEQ = name + "="
    const ca = document.cookie.split(';')
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i]
      while (c.charAt(0) === ' ') c = c.substring(1, c.length)
      if (c.indexOf(nameEQ) === 0) {
        const cookieValue = c.substring(nameEQ.length, c.length)
        try {
          return JSON.parse(cookieValue)
        } catch (e) {
          return null
        }
      }
    }
    return null
  }

  // Load tasks from cookies on component mount
  useEffect(() => {
    const savedTasks = getCookie('todoTasks')
    const savedDarkMode = getCookie('todoDarkMode')
    const savedFilter = getCookie('todoFilter')

    if (savedTasks && Array.isArray(savedTasks)) {
      setTasks(savedTasks)
    } else {
      const defaultTasks = [
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
      ]
      setTasks(defaultTasks)
    }

    if (typeof savedDarkMode === 'boolean') {
      setDarkMode(savedDarkMode)
    }

    if (savedFilter && ['all', 'reminder', 'not-important'].includes(savedFilter)) {
      setFilter(savedFilter)
    }
  }, [])

  useEffect(() => {
    if (tasks.length > 0) {
      setCookie('todoTasks', tasks, 7)
    }
  }, [tasks])

  useEffect(() => {
    setCookie('todoDarkMode', darkMode, 7)
  }, [darkMode])

  useEffect(() => {
    setCookie('todoFilter', filter, 7)
  }, [filter])

  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000) + 1

    const newTask = { id, ...task }
    setTasks([...tasks, newTask])
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id ))
  }

  const editTask = (id) => {
    const taskToEdit = tasks.find(task => task.id === id)
    setEditingTask(taskToEdit)
  }

  const updateTask = (updatedTask) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task))
    setEditingTask(null)
  }

  const toggleReminder = (id) => {
    setTasks(tasks.map((task) => task.id === id ? {
      ...task, reminder: !task.reminder
    } : task ))
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === 'reminder') return task.reminder
    if (filter === 'not-important') return !task.reminder
    return true
  })

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode')
    } else {
      document.body.classList.remove('dark-mode')
    }
  }, [darkMode])

  return (
    <div className={`container ${darkMode ? 'dark-mode' : ''}`}>
      <TaskInput 
        title='To-Do List App' 
        onAdd={() => setShowAddTask(!showAddTask)} 
        showAdd={showAddTask}
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
      />
      {showAddTask && <AddTask onAdd={addTask}/>}
      {editingTask && <EditTask task={editingTask} onUpdate={updateTask} onCancel={() => setEditingTask(null)}/>}
      <FilterBar currentFilter={filter} onFilterChange={setFilter} />
      {filteredTasks.length > 0 ? (
        <TodoItem tasks={filteredTasks} onEdit={editTask} onDelete={deleteTask} onToggle={toggleReminder}/>
        ) : 'No tasks to show'}
    </div>
  )
}

export default App
