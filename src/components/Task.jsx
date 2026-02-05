import { FaTimes, FaEdit } from 'react-icons/fa'

const Task = ({ task, onDelete, onToggle, onEdit }) => {
  return (
    <div className={`task ${task.reminder ? 'reminder' : ''}`} onDoubleClick={() =>onToggle(task.id)}>
      <h3>{
        task.text}
        <div style={{display:'flex', flexDirection:'column', justifyContent:'flex-end', alignItems:'center', gap:'10px'}}>
          <FaTimes style={{color:'red'}} onClick={() => onDelete(task.id)} />
          <FaEdit style={{color:'blue', marginLeft:'10px'}} onClick={() => onEdit(task.id)} />
        </div>
      </h3>
      <p>{task.day}</p>
    </div>
  )
}

export default Task
