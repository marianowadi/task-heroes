import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faXmark,
  faTriangleExclamation,
  faHeartCircleMinus,
  faClock
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
  const overdue = timeDiff <= -1
  return (
    <div
      key={task.uuid}
      className=" my-1 flex flex-row items-center justify-between  border-2 border-dashed p-4 text-lg"
    >
      <div className="flex basis-1/3 flex-row items-center">
        <input
          type="checkbox"
          className="mr-2 size-5 appearance-none  border-2 border-dashed bg-brand-yellow checked:border-0 checked:bg-black"
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
        <div className="flex flex-row items-center justify-center">
          {overdue ? (
            <FontAwesomeIcon
              className="ml-2 text-brand-red"
              title="Overdue"
              icon={faHeartCircleMinus}
            />
          ) : (
            <FontAwesomeIcon
              className="ml-2"
              icon={dueToday ? faTriangleExclamation : faClock}
              title={`due ${dayjs().to(task.deadline)}`}
            />
          )}
        </div>
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
