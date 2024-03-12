import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer
} from 'react'
import { Action, State, Stats } from 'types'
import { getDiff } from 'utils'
import { v4 as uuidv4 } from 'uuid'
import { default as dayjs } from 'dayjs'

type TaskContextValue = {
  state: State
  dispatch: (action: Action) => void
}

const defaulStats: Stats = {
  currentHealthPoints: 50,
  currentLevel: 1,
  currentExperience: 0,
  totalHealthPoints: 50
}

const TasksContext = createContext<TaskContextValue | undefined>(undefined)

function calculateState(state: State) {
  const overdueTasks = state.tasks?.filter(
    (task) => task.deadline && !task.penalized && getDiff(task.deadline) > -1
  )
  const tasks = [...state.tasks]

  return {
    tasks: overdueTasks
      ? [
          ...tasks.map((task) => ({
            ...task,
            penalized: overdueTasks.includes(task) ? true : task.penalized
          }))
        ]
      : tasks,
    stats: {
      ...state.stats,
      currentHealthPoints:
        overdueTasks.length > 0
          ? state.stats.currentHealthPoints - overdueTasks.length * 3
          : state.stats.currentHealthPoints
    }
  }
}

function init() {
  const rawStorageValues = localStorage.getItem('tasks')
  const storageValues: State | null = rawStorageValues
    ? JSON.parse(rawStorageValues)
    : null

  if (!storageValues) return { tasks: [], stats: defaulStats }
  return calculateState(storageValues)
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
            penalized: false,
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
      return {
        ...state,
        tasks: [...values],
        stats: {
          ...state.stats,
          currentExperience: done
            ? state.stats.currentExperience + 3
            : state.stats.currentExperience
        }
      }
    }
    case 'delete': {
      const values = [...state.tasks]
      const { index } = action.payload
      values.splice(index!, 1)
      return { ...state, tasks: [...values] }
    }
    case 'recalculate': {
      return calculateState(state)
    }
    default:
      return state
  }
}

const TasksProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(
    appReducer,
    {
      tasks: JSON.parse(localStorage.getItem('tasks') ?? '[]')
    },
    init
  )
  const value = { state, dispatch }

  useEffect(() => {
    if (JSON.stringify(state) !== localStorage.getItem('tasks') ?? '{}')
      localStorage.setItem('tasks', JSON.stringify(state))

    const timer = setInterval(() => {
      const now = dayjs()
      if (
        state.tasks?.filter(
          (task) =>
            task.deadline &&
            !task.penalized &&
            now.diff(dayjs(task.deadline, 'hour')) > -1
        )
      ) {
        dispatch({
          payload: {
            type: 'recalculate'
          }
        })
      }
    }, 30000)

    return () => clearInterval(timer)
  }, [state])

  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
}

const useTasks = () => {
  const context = useContext(TasksContext)
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider')
  }
  return context
}

export { TasksProvider, useTasks }
