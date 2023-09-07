import { Client } from "../../../types/types"
import Dropdown from "../Dropdown"
import IconcCart from "../IconCart"


const Header = ({ isClient, setIsDrawerOpen }: { isClient: Client, setIsDrawerOpen: any }) => {

  return (
    <header className='grid grid-cols-2 gap-2 ml-5'>
      <div className="col-span-2 text-end">
        <IconcCart setIsDrawerOpen={setIsDrawerOpen} />
      </div>
      <div>
        <h1 className="text-green text-4xl font-semibold">Olá {isClient && (<span>,</span>)}</h1>
        {isClient && (
          <Dropdown data={isClient} />
        )}
      </div>
    </header>
  )
}

export default Header