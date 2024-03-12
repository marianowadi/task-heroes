import { useTasks } from './StatsProvider'
import { TaskRow } from './TaskRow'

export const TaskList = () => {
  const { state, dispatch } = useTasks()

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

  return (
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
  )
}
