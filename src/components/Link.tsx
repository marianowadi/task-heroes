import { faFlask } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
export const Link = ({ text }: { text: string }) => {
  return (
    <div className="mx-4 flex h-full flex-col items-center border-x-2 border-dashed p-12">
      <h1 className="text-xl">{text}</h1>
      <FontAwesomeIcon className="text-xl" icon={faFlask} />
    </div>
  )
}
