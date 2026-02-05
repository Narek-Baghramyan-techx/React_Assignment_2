import { useState, useEffect } from 'react'

const EditTask = ({ task, onUpdate, onCancel }) => {
  const [text, setText] = useState('')
  const [day, setDay] = useState('')
  const [reminder, setReminder] = useState(false)

  useEffect(() => {
    if (task) {
      setText(task.text)
      setDay(task.day)
      setReminder(task.reminder)
    }
  }, [task])

  const onSubmit = (e) => {
    e.preventDefault()

    if(!text) {
      alert ('Please add a task')
      return
    }

    onUpdate({ ...task, text, day, reminder })

    setText('')
    setDay('')
    setReminder(false)
  }

  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label>Task</label>
        <input type="text" placeholder="Edit Task" value={text} onChange={(e) => setText(e.target.value)} />
      </div>
      <div className="form-control">
        <label>Day & Time</label>
        <input type="text" placeholder="Edit Day & Time" value={day} onChange={(e) => setDay(e.target.value)} />
      </div>
      <div className="form-control form-control-check">
        <label>Set Reminder</label>
        <input type="checkbox" checked={reminder} value={reminder} onChange={(e) => setReminder(e.currentTarget.checked)} />
      </div>

      <input className="btn btn-block" type="submit" value='Update Task' />
      <button type="button" className="btn btn-block" onClick={onCancel} style={{marginTop: '10px'}}>Cancel</button>
    </form>
  )
}

export default EditTask