'use client'

import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Client, Message, Product } from "../../../types/types";
import { clearCart, deleteProductCart, getProductsCart } from "../../api/Ecomerce";
import ItemCart from "../ItemCart";
import Button from "../Button";
import Alert from "../Alert";

const Cart = ({ isOpen, onClose }) => {

  const [products, setProducts] = useState<Product[] | null>()
  const [isClient, setIsClient] = useState<null | Client>()
  const [alertMessage, setAlertMessage] = useState<Message | null>()
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const client = localStorage.getItem('clientLogged')
    setIsClient(client && JSON.parse(client))

    const fetchProducts = async () => {
      const products = await getProductsCart();
      setProducts(products)
    }
    fetchProducts()
  }, [isOpen])


  const handleAlertClose = () => {
    setShowAlert(true);
    setAlertMessage(null)
  };

  const removeProduct = (productSelect: Product) => {
    const result = deleteProductCart(productSelect)
    const newProducts = products?.filter((prod) => prod.id !== productSelect.id)
    setProducts(newProducts)
    setAlertMessage(result)
  }

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
                {!products || products?.length === 0 ?
                  (
                    <div className="flex justify-center items-center w-full">
                      <p className="text-center text-green text-lg font-bold">Não há produtos para serem exebidos</p>
                    </div>) :
                  (
                    products?.map((product) =>
                      <ItemCart product={product} removeProduct={removeProduct} />
                    )
                  )
                }
              </div>
              <footer className="flex justify-around mt-5">
                <Button disabled={!products} text="Finalizar" type="button" className="text-xs m-0 p-0" onClick={() => console.log('Finalizar')} />
                <Button disabled={!products} text="Limpar" type="button" className="text-xs m-0 p-0" onClick={() => {
                  clearCart(),
                    onClose()
                }} />
              </footer>
              {
                alertMessage && (
                  <Alert
                    message={alertMessage}
                    onClose={handleAlertClose}
                    showAlert={showAlert}
                    setShowAlert={setShowAlert}
                  />)
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
