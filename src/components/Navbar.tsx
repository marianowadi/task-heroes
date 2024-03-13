import { Avatar } from './Avatar'

export const Navbar = () => {
  return (
    <div className="flex  h-32 w-full flex-row border-2 border-dashed">
      <div className="m-6 mr-8 flex flex-row items-center">
        <h1 className="text-3xl font-bold">Task Heroes</h1>
      </div>
      {/*       <Link text="Skills" />
      <Link text="Items" /> */}
      <Avatar />
    </div>
  )
}
