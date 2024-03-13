import {
  faUserLarge,
  faHeart,
  faE,
  faX,
  faP
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTasks } from './StatsProvider'

const getExp = (currentLevel: number) =>
  currentLevel === 1 ? 10 : currentLevel * 10 * 1.6

export const Avatar = () => {
  const { state } = useTasks()
  return (
    <div className="my-4 ml-auto mr-4 flex flex-row items-center rounded-lg border-2 border-dashed p-12">
      <FontAwesomeIcon className="text-5xl" icon={faUserLarge} />
      <div className="mx-2 self-baseline">
        <h2>lvl {state.stats.currentLevel}</h2>
      </div>

      <div className="ml-2 flex w-28 flex-row items-center justify-between rounded-lg border-2  border-dashed px-3 py-1">
        <FontAwesomeIcon
          className="mr-2  text-sm text-brand-red"
          icon={faHeart}
        />
        {state.stats.currentHealthPoints}/{state.stats.totalHealthPoints}
      </div>
      <div className="ml-2 flex w-28 flex-row items-center justify-between rounded-lg border-2 border-dashed  px-3 py-1">
        <div>
          <FontAwesomeIcon className="text-sm" icon={faE} />
          <FontAwesomeIcon className="text-sm" icon={faX} />
          <FontAwesomeIcon className="text-sm" icon={faP} />
        </div>
        {state.stats.currentExperience}/{getExp(state.stats.currentLevel)}
      </div>
    </div>
  )
}
