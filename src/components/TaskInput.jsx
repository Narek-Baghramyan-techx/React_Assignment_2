import Button from './Button'
import { FaMoon, FaSun } from 'react-icons/fa'

const TaskInput = ({ title, onAdd, showAdd, darkMode, onToggleDarkMode }) => {
  return (
    <header className='header'>
      <h1>{title}</h1>
      <div style={{ display: 'flex', gap: '10px' }}>
        <Button color={showAdd ? 'red' : 'green'} text={showAdd ? 'Close' : 'Add'} onClick={onAdd}/>
        <button 
          onClick={onToggleDarkMode} 
          className='btn dark-mode-btn'
          style={{ backgroundColor: darkMode ? '#333' : '#f4f4f4', color: darkMode ? '#fff' : '#000' }}
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </header>
  )
}

export default TaskInput
