'use client'
import { HeartIcon } from "@heroicons/react/24/outline"
import { Client, Message, Product } from "../../../types/types"
import Button from "../Button"
import { postCart } from "../../api/Ecomerce"

const CardProduct = ({ product, isClient, setAlertMessage, openAlert }:
  { product: Product, isClient: Client, setAlertMessage: any, openAlert: any }) => {

  const isClientStyle = isClient ? 'text-green' : 'text-green-ligth'

  const addProductCart = (productSelect: Product) => {
    const result = postCart(productSelect)
    setAlertMessage(result)
    openAlert(true)
  }


  return (
    <div className="m-3 rounded-md shadow-md w-auto h-34 flex bg-bege/35 hover:shadow-xl ">
      <div className=" mr-2">
        <img
          src={product?.image}
          alt={product?.name}
          className="h-32 w-40 rounded-md"
          width='auto'
          height='auto'
        />
      </div>
      <div className="w-60 overflow-hidden">
        <p className="text-lg text-green font-semibold mb-1.5">{product?.name}</p>
        <p className="line-clamp-2 text-xs text-justify text-gray mr-2">{product?.description}</p>
        <p className="text-end mt-3 mr-2 font-bold text-green">R${product?.value}</p>
        <div className="flex">
          <Button text="Adicionar ao carrinho" type="button" className="text-xs my-3" onClick={() => addProductCart(product)} />
          <button disabled={!isClient ? true : false}>
            <HeartIcon className={`h-5 w-5 mx-2 ${isClientStyle}`} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default CardProduct