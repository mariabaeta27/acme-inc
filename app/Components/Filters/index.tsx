'use client'

import { XMarkIcon } from "@heroicons/react/24/outline"
import { Client, Product, ProductWithFavorites } from "../../../types/types"
import Input from "../Input"
import { useState } from "react"


const Filters = ({
  products,
  setProducts,
  favorites,
  isClient,
}: {
  products: ProductWithFavorites[] | Product[],
  setProducts: any,
  favorites: ProductWithFavorites[]
  isClient: Client
}) => {

  const [search, setSearch] = useState<string>('')


  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (e) => {
    const { checked } = e.target
    console.log(checked)
    setIsChecked(checked);
    if (checked) {
      setProducts()
    } else {
      setProducts(products)
    }

  };


  const handleFilterChange = (e: any) => {
    const { value } = e.target
    setSearch(value)
    let filterProducts;
    if (value) {
      filterProducts = products?.filter((product) => product?.name.toLocaleLowerCase().startsWith(value.toLocaleLowerCase()))
    } else {
      filterProducts = products
    }
    setProducts(filterProducts)
  }

  return (
    <div className="flex flex-col justify-center items-center ">
      <Input
        placeholder="Filtrar por:"
        name="filter"
        type="text"
        onChange={handleFilterChange}
        className="m-0"
        value={search}
        icon={
          <XMarkIcon className='m-0 p-0 text-start h-3 w-3'
            onClick={() => {
              setSearch(''),
                setProducts(products)
            }}
          />
        }
      />
      <Input
        disabled={!isClient ? true : false}
        label="Favoritos"
        name="checkbox"
        type="checkbox"
        checked={isChecked}
        className={`w-10 rounded mb-0  form-checkbox checked:bg-blue-500 checked:bg-green sm:w-48`}
        onChange={handleCheckboxChange}
      />
    </div>

  )
}

export default Filters