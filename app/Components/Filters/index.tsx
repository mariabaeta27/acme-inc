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
  isChecked,
  setIsChecked
}: {
  products: ProductWithFavorites[] | Product[],
  setProducts: any,
  favorites: ProductWithFavorites[],
  isClient: Client,
  isChecked: boolean,
  setIsChecked: any
}) => {

  const [search, setSearch] = useState<string>('')

  const handleCheckboxChange = (e: any) => {
    const { checked } = e.target
    setIsChecked(checked);
    setSearch('')
    if (checked) {
      setProducts(favorites)
    } else {
      setProducts(products)
    }

  };


  const handleFilterChange = (e: any) => {
    const { value } = e.target
    setSearch(value)
    let filterProducts: any;

    const productsForFilter = isChecked ? favorites : products

    if (value) {
      filterProducts = productsForFilter?.filter((product) => product?.name.toLocaleLowerCase().startsWith(value.toLocaleLowerCase()))
    } else {
      filterProducts = productsForFilter
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
          <button
            className="m-0 p-0 text-start h-3 w-3"
            onClick={() => {
              setSearch(''),
                setProducts(products)
            }}
          >
            <XMarkIcon />
          </button>
        }
      />
      <Input
        disabled={!isClient ? true : false}
        label="Favoritos"
        name="checkbox"
        type="checkbox"
        checked={isChecked}
        className={`w-10 rounded mb-0  form-checkbox checked:bg-blue-500 checked:bg-green sm:w-52`}
        onChange={handleCheckboxChange}
      />
    </div>

  )
}

export default Filters