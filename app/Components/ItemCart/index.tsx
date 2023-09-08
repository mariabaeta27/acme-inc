'use client'

import { XMarkIcon } from "@heroicons/react/24/outline";

import Input from "../Input";
import { useState } from "react";

const ItemCart = ({ product, removeProduct, handleCheck }: { product: any, removeProduct: any, handleCheck: any }) => {

  const [isChecked, setIsChecked] = useState(product?.buy)


  return (
    <div
      className="m-3 flex gap-10px rounded-md shadow-sm w-full h-34  bg-bege/35 hover:shadow-md bg-green-ligth/30 "
      key={product?.id}
    >
      <div className="pt-4 mx-1">
        <Input
          name="checkbox"
          type="checkbox"
          checked={isChecked}
          className={`w-3 h-3 rounded m-0 p-0 form-checkbox checked:bg-green`}
          onChange={() => { setIsChecked(!isChecked), handleCheck(product.id) }}
        />
      </div>
      <div className="mr-2">
        <img
          src={product?.image}
          alt={product?.name}
          className="h-10 w-10 rounded-md ml-0.5 mt-0.5"
          width='auto'
          height='auto'
        />
      </div>
      <div className="w-auto grid gap-5 grid-cols-4 col-span-3 justify-center pt-2">
        <p className="text-green  mr-2 w-40  col-span-2">{product?.name}</p>
        <p className="font-semibold text-green w-18">R${product?.value}</p>
        <XMarkIcon className="h-5 w-5 text-green ml-5 mt-1" onClick={() => removeProduct(product)} />
      </div>




    </div>
  )
}
export default ItemCart;