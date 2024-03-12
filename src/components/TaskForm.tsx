import { useState } from 'react'
import { useTasks } from './StatsProvider'

export const TaskForm = () => {
  const { dispatch } = useTasks()

  const [newTask, setNewTask] = useState<{
    description: string
    deadline: string | undefined
  }>({ description: '', deadline: undefined })

  function handleAddTask() {
    dispatch({
      payload: {
        type: 'add',
        description: newTask.description,
        deadline: newTask.deadline
      }
    })
    setNewTask({ description: '', deadline: undefined })
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      handleAddTask()
    }
  }
  return (
    <div className="my-4 flex w-3/5 flex-row items-center justify-around rounded-lg border-2 border-dashed p-4">
      <div className="flex flex-row items-center justify-between">
        <label htmlFor="newTask">Name</label>
        <input
          className="ml-2 rounded-lg border-2 border-dashed bg-brand-yellow p-2"
          id="newTask"
          type="text"
          value={newTask.description}
          onChange={(e) =>
            setNewTask((prev) => ({
              ...prev,
              description: e.target.value
            }))
          }
          onKeyDown={(e) => handleKeyDown(e)}
        />
      </div>
      <div className=" flex flex-row items-center justify-between">
        <label htmlFor="duedate">Due</label>
        <input
          className="ml-2 rounded-lg border-2 border-dashed bg-brand-yellow p-2"
          type="datetime-local"
          id="duedate"
          step={600}
          onChange={(e) =>
            setNewTask((prev) => ({
              ...prev,
              deadline: e.target.value
            }))
          }
        />
      </div>
      <button
        className="rounded-md bg-brand-green px-6 py-2"
        onClick={() => handleAddTask()}
      >
        Add
      </button>
    </div>
  )
}
