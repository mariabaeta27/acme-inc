
import { ChevronDownIcon, ShoppingBagIcon } from "@heroicons/react/24/outline"
import { Client } from "../../../types/types"
import Dropdown from "../Dropdown"


const Header = ({ isClient }: { isClient: Client }) => {
  // console.log(isClient)

  return (
    <header className='grid grid-cols-2 gap-2 ml-5'>
      <div className="col-span-2 text-end">
        <button>
          <ShoppingBagIcon className="h-6 w-6 text-green mr-5" />
        </button>
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