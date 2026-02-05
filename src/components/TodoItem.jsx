import Task from './Task'

const TodoItem = ({ tasks, onDelete, onToggle, onEdit }) => {

  return (
    <>
      {tasks.map((task) => (
        <Task key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} onToggle={onToggle}/>
      ))}
    </>
  )
}

export default TodoItem
