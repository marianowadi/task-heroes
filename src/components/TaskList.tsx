import { faUpLong } from '@fortawesome/free-solid-svg-icons'
import { useTasks } from './StatsProvider'
import { TaskRow } from './TaskRow'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
    <div
      className=" flex  h-2/5 w-3/5 flex-col overflow-x-hidden text-clip  rounded-lg  border-2 border-dashed
    p-6
    [&::-webkit-scrollbar-thumb]:bg-[#e0d0d0] [&::-webkit-scrollbar]:bg-black [&::-webkit-scrollbar]:[margin:8px] [&::-webkit-scrollbar]:[width:8px]"
    >
      {state.tasks.length ? (
        state.tasks.map((task, index) => (
          <TaskRow
            key={task.uuid}
            task={task}
            index={index}
            onStatusChangeHandler={updateStatus}
            onTaskDeleteHandler={handleDeleteTask}
          />
        ))
      ) : (
        <div className="mt-4 flex flex-col items-center justify-center">
          <FontAwesomeIcon className="ml-2 text-4xl " icon={faUpLong} />
          <h1 className="text-lg">Add your first task</h1>
        </div>
      )}
    </div>
  )
}
