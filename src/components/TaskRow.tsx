import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faXmark,
  faTriangleExclamation,
  faHeartCircleMinus
} from '@fortawesome/free-solid-svg-icons'
import { default as dayjs } from 'dayjs'
import { default as relativeTime } from 'dayjs/plugin/relativeTime'
import { Task } from 'types'
import { getDiff } from 'utils'

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
  const timeDiff = getDiff(task.deadline)
  const dueToday = timeDiff <= 24
  const overdue = timeDiff > -1
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
      {task.deadline && !overdue && (
        <h3 className=" text-xl">
          {dayjs().to(task.deadline)}
          {dueToday && (
            <FontAwesomeIcon
              className="ml-2"
              icon={faTriangleExclamation}
              title="Due today!"
            />
          )}
        </h3>
      )}
      {task.deadline && overdue && (
        <h3 className=" text-xl">
          Overdue
          <FontAwesomeIcon
            className="ml-2  text-brand-red"
            icon={faHeartCircleMinus}
          />
        </h3>
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
