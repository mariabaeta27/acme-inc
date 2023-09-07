'use client'

import { XMarkIcon } from "@heroicons/react/24/outline";
import { Product } from "../../../types/types";

const ItemCart = ({ product, removeProduct }: { product: Product, removeProduct: any }) => {

  return (
    <div
      className="m-3 rounded-md shadow-sm w-auto h-34 flex bg-bege/35 hover:shadow-md bg-green-ligth/30 "
      key={product?.id}
    >
      <p>INPUT</p>
      <div className=" mr-2">
        <img
          src={product?.image}
          alt={product?.name}
          className="h-10 w-10 rounded-md ml-0.5 mt-0.5"
          width='auto'
          height='auto'
        />
      </div>
      <div className="w-auto grid  grid-cols-4  justify-center pt-2">
        <p className="text-green  mr-2 w-40  col-span-2">{product?.name}</p>
        <p className="font-semibold text-green w-18">R${product?.value}</p>
        <XMarkIcon className="h-5 w-5 text-green ml-5 mt-1" onClick={() => removeProduct(product)} />
      </div>




    </div>
  )
}
export default ItemCart;