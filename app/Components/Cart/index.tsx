'use client'

import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Client, Product } from "../../../types/types";
import { clearCart, getProductsCart } from "../../api/Ecomerce";
import ItemCart from "../ItemCart";
import Button from "../Button";

const Cart = ({ isOpen, onClose }) => {


  const [products, setProducts] = useState<Product[] | null>()
  const [isClient, setIsClient] = useState<null | Client>()

  useEffect(() => {
    const client = localStorage.getItem('clientLogged')
    setIsClient(client && JSON.parse(client))

    const fetchProducts = async () => {
      const products = await getProductsCart();
      setProducts(products)
    }
    fetchProducts()
  }, [isOpen])



  return (
    <div
      className={`fixed inset-0 z-50 ${isOpen ? 'block' : 'hidden'}`}
    >
      <div
        className="fixed inset-0 transition-opacity bg-white/50"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 bg-gray-600 opacity-75"
        ></div>
      </div>
      <div
        className="fixed inset-y-0 right-0 flex"
      >
        <div className="relative w-screen max-w-md">
          <div
            className="h-full flex flex-col bg-white shadow-xl"
          >
            <div className="p-4 ">
              <button
                onClick={onClose}
                className="absolute top-0 right-0 p-4 hover:text-gray-900"
              >
                <XMarkIcon className="h-5 w-5 text-green" />
              </button>
              <h1 className="font-bold text-xl text-green">Carrinho</h1>
              <div className=" mt-10">
                {!products ? <div className="flex justify-center items-center w-full">
                  <p className="text-center text-green text-lg font-bold">Não há produtos para serem exebidos</p>
                </div> : products?.map((product) =>
                  <ItemCart product={product} />
                )}
              </div>
              <footer className="flex justify-around mt-5">
                <Button disabled={!products} text="Finalizar" type="button" className="text-xs m-0 p-0" onClick={() => console.log('Finalizar')} />
                <Button disabled={!products} text="Limpar" type="button" className="text-xs m-0 p-0" onClick={() => {
                  clearCart(),
                    onClose()
                }} />
              </footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
