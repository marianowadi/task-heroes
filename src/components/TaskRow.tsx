import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { default as dayjs } from 'dayjs'
import { default as relativeTime } from 'dayjs/plugin/relativeTime'
import { Task } from 'types'

dayjs.extend(relativeTime)
type TaskRowProps = {
  task: Task
  onStatusChangeHandler: (done: boolean, index: number) => void
  onTaskDeleteHandler: (index: number) => void
  index: number
}

export const TaskRow = ({
  task,
  index,
  onTaskDeleteHandler,
  onStatusChangeHandler
}: TaskRowProps) => {
  return (
    <div
      key={task.uuid}
      className=" flex flex-row  items-center justify-between p-4 text-lg"
    >
      <div className="flex flex-row items-center">
        <input
          type="checkbox"
          className="mr-2 size-5"
          checked={task.done}
          onChange={() => onStatusChangeHandler(!task.done, index)}
        />
        <h2
          className={`${task.done ? 'line-through opacity-50 ' : ''} text-xl`}
        >
          {task.description}
        </h2>
      </div>
      {task.deadline && (
        <h3 className=" text-xl">{dayjs().to(task.deadline)}</h3>
      )}
      <button
        className="ml-4 rounded-md p-1 "
        onClick={() => onTaskDeleteHandler(index)}
      >
        <FontAwesomeIcon icon={faXmark} />
      </button>
    </div>
  )
}
