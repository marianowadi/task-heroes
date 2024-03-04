import React, { useEffect, useReducer, useState } from 'react'
import { FaRegTrashAlt } from 'react-icons/fa'
import { v4 as uuidv4 } from 'uuid'

type Task = {
  uuid: string
  description: string
  done: boolean
  createdAt?: Date
  deadline?: Date
}

type State = { tasks: Task[] }
type CreateActionPayload = {
  type: 'add'
  description: string
}
type DeleteActionPayload = {
  type: 'delete'
  index: number
}
type UpdateActionPayload = {
  type: 'update'
  description?: string
  done: boolean
  index: number
}
type Action = {
  payload: CreateActionPayload | UpdateActionPayload | DeleteActionPayload
}

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
  const [newTask, setNewTask] = useState<string>('')

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

  function handleAddTask(description: string) {
    dispatch({
      payload: {
        type: 'add',
        description
      }
    })
    setNewTask('')
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      handleAddTask(e.currentTarget.value)
    }
  }

  return (
    <div className="flex h-dvh  flex-col items-center  bg-white font-sans">
      <div className="flex flex-row justify-center p-5">
        <h1 className="text-3xl font-bold">Task Heroes</h1>
      </div>
      <div className="flex flex-row justify-between p-5">
        <input
          className="basis-1 border p-2"
          id="newTask"
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.currentTarget.value)}
          placeholder="My new task"
          onKeyDown={(e) => handleKeyDown(e)}
        />
        <button
          className="ml-6 rounded-md bg-brand-green p-2"
          onClick={() => handleAddTask(newTask)}
        >
          Add
        </button>
      </div>
      <div className="flex size-2/5  flex-col rounded-lg border  p-6">
        {state.tasks?.map((task, index) => (
          <div
            key={task.uuid}
            className=" flex flex-row  items-center justify-between p-4 text-lg"
          >
            <div className="flex flex-row items-center">
              <input
                type="checkbox"
                className="mr-2 size-5"
                checked={task.done}
                onChange={() => updateStatus(!task.done, index)}
              />
              <h2
                key={task.uuid}
                className={`${task.done ? 'line-through opacity-50 ' : ''}`}
              >
                {task.description}
              </h2>
            </div>
            <button
              className="ml-4 rounded-md p-1 "
              onClick={() => handleDeleteTask(index)}
            >
              <FaRegTrashAlt />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
