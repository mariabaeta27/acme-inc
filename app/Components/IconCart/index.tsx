import { ShoppingBagIcon } from "@heroicons/react/24/outline"

const IconcCart = ({ setIsDrawerOpen }: any) => {
  return (
    <button onClick={() => setIsDrawerOpen(true)}>
      <ShoppingBagIcon className="h-6 w-6 text-green mr-5" />
    </button>
  )
}

export default IconcCart