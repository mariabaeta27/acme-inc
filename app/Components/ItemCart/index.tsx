'use client'

import { XMarkIcon } from "@heroicons/react/24/outline";

import Input from "../Input";
import { useEffect, useState } from "react";

const ItemCart = ({ product, removeProduct, handleCheck, addProduct }: { product: any, removeProduct: any, handleCheck: any, addProduct: any }) => {
  const [isChecked, setIsChecked] = useState(product?.buy)
  const [amount, setAmount] = useState(0)

  useEffect(() => {
    setAmount(product.amount)
  }, [product])



  return (
    <div
      className="m-3 flex w-auto rounded-md shadow-sm h-34  bg-bege/35 hover:shadow-md bg-green/10"
    >
      <div className="pt-4 mx-1">
        <Input
          name="checkbox"
          type="checkbox"
          checked={isChecked}
          className={`w-3 h-3 rounded m-0 p-0 form-checkbox sm:w-full`}
          onChange={() => { setIsChecked(!isChecked), handleCheck(product.id) }}
        />
      </div>

      <div className="flex w-full py-1">
        <div className="m-1">
          <img
            src={product?.image}
            alt={product?.name}
            className="h-full w-8 p-0"
            width='auto'
            height='auto'
          />
        </div>
        <div className="w-full grid grid-flow-col-2 mx-0.5">
          <p className="text-green  mr-2 w-40  col-span-2">{product?.name}</p>

          <div className="col-span-2 flex justify-around w-full">
            <div className="flex">
              <p
                onClick={() => {
                  setAmount(amount + 1)
                  addProduct(product)
                }}
              >
                +
              </p>
              <input disabled value={amount} type="number" className="h-5 w-5 rounded text-center mx-2 bg-white" onChange={(event) => { console.log(event.target.value) }} />
              <p onClick={() => {
                setAmount(amount - 1)
                removeProduct(product)
              }}
              >
                -
              </p>
            </div>
            <p className="font-semibold text-green w-18 mt-1 mr-1">R${(product?.value * amount).toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ItemCart;