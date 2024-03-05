import React, { useEffect, useReducer, useState } from 'react'

import { v4 as uuidv4 } from 'uuid'
import { Navbar } from './Navbar'
import { Action, State } from 'types'
import { TaskRow } from './TaskRow'

function appReducer(state: State, action: Action): State {
  const { type } = action.payload
  switch (type) {
    case 'add':
      return {
        ...state,
        tasks: [
          ...state.tasks,
          {
            description: action.payload.description,
            done: false,
            createdAt: new Date(),
            deadline: action.payload.deadline,
            uuid: uuidv4()
          }
        ]
      }
    case 'update': {
      const values = [...state.tasks]
      const { index, done } = action.payload
      const task = values[index!]
      values.splice(index!, 1, {
        ...task,
        done: done ?? false
      })
      return { ...state, tasks: [...values] }
    }
    case 'delete': {
      const values = [...state.tasks]
      const { index } = action.payload
      values.splice(index!, 1)
      return { ...state, tasks: [...values] }
    }
    default:
      return state
  }
}

function App() {
  const [state, dispatch] = useReducer(appReducer, { tasks: [] }, init)
  const [newTask, setNewTask] = useState<{
    description: string
    deadline: string | undefined
  }>({ description: '', deadline: undefined })

  function init() {
    return { tasks: JSON.parse(localStorage.getItem('tasks') ?? '[]') }
  }

  useEffect(() => {
    if (JSON.stringify(state.tasks) !== localStorage.getItem('tasks') ?? '[]')
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
  }, [state])

  function updateStatus(status: boolean, index: number) {
    dispatch({
      payload: {
        type: 'update',
        index,
        done: status
      }
    })
  }

  function handleDeleteTask(index: number) {
    dispatch({
      payload: {
        type: 'delete',
        index
      }
    })
  }

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
    <div className="flex h-dvh  flex-col items-center  bg-brand-yellow font-sans">
      <Navbar />
      <div className="flex flex-row justify-between p-5">
        <input
          className="basis-1 border p-2"
          id="newTask"
          type="text"
          value={newTask.description}
          onChange={(e) =>
            setNewTask((prev) => ({
              ...prev,
              description: e.target.value
            }))
          }
          placeholder="My new task"
          onKeyDown={(e) => handleKeyDown(e)}
        />
        <input
          className="ml-2 border p-2"
          type="datetime-local"
          id="meeting-time"
          name="meeting-time"
          step={600}
          onChange={(e) =>
            setNewTask((prev) => ({
              ...prev,
              deadline: e.target.value
            }))
          }
        />
        <button
          className="ml-6 rounded-md bg-brand-green p-2"
          onClick={() => handleAddTask()}
        >
          Add
        </button>
      </div>
      <div className="flex h-2/5 w-3/5  flex-col overflow-y-auto text-clip rounded-lg border-2  border-dashed  p-6 ">
        {state.tasks?.map((task, index) => (
          <TaskRow
            key={task.uuid}
            task={task}
            index={index}
            onStatusChangeHandler={updateStatus}
            onTaskDeleteHandler={handleDeleteTask}
          />
        ))}
      </div>
    </div>
  )
}

export default App
