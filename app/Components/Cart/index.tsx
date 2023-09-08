'use client'

import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Client, ClientComplet, Message, Product, ProductWithBuy } from "../../../types/types";
import { clearCart, deleteProductCart, getProductsCart } from "../../api/Ecomerce";
import ItemCart from "../ItemCart";
import Button from "../Button";

import Modal from "../Modal";
import { useRouter } from "next/navigation";

const Cart = ({ isOpen, onClose }) => {

  const router = useRouter()
  const [products, setProducts] = useState<null | ProductWithBuy[]>()
  const [isClient, setIsClient] = useState<null | ClientComplet>()
  const [openModal, setOpenModal] = useState(false)
  const [message, setMessage] = useState<Message | null>()
  const [count, setCount] = useState<number>()

  useEffect(() => {
    const client = localStorage.getItem('clientLogged')
    setIsClient(client && JSON.parse(client))

    const fetchProducts = async () => {
      const products = await getProductsCart();

      let countReult = 0;

      products.forEach(element => {
        console.log(parseFloat(element.value))
        countReult = countReult + parseFloat(element.value)
      });
      setCount(countReult)

      const productEdit = products?.map((product: Product) => ({ ...product, buy: false }))
      setProducts(productEdit)
    }
    fetchProducts()
  }, [isOpen])

  const removeProduct = (productSelect: any) => {
    deleteProductCart(productSelect)
    const newProducts = products?.filter((prod) => prod.id !== productSelect.id)
    const newCount = count - parseFloat(productSelect.value)
    setCount(newCount)
    setProducts(newProducts)
  }

  const handleCheck = (productId: any) => {
    const newProducts = products?.map((product) => {
      if (product.id === productId) {
        return {
          ...product,
          buy: !product.buy
        }
      }
      return product
    })
    setProducts(newProducts)
    setMessage(null)
  }

  const redirect = () => {
    router.push('/login')
  }

  const checkout = () => {
    const bdBuys = localStorage.getItem('bdBuys')
    const buysSalve = bdBuys && JSON.parse(bdBuys)
    if (isClient) {
      const buys = products?.filter((product) => product.buy && product)
      const notBuys = products?.filter((product) => !product.buy && product)
      console.log(buys)
      if (buys.length !== 0) {
        console.log(buysSalve)
        if (!buysSalve || buysSalve?.length === 0) {
          localStorage.setItem('bdBuys', JSON.stringify([{ client: { name: isClient.name, clientId: isClient.id }, buys: buys, value: count }]))
        } else {
          localStorage.setItem('bdBuys', JSON.stringify([...JSON.parse(bdBuys), { client: { name: isClient.name, clientId: isClient.id }, buys: buys, value: count }]))
        }
        setProducts(notBuys)
        localStorage.setItem('bdCart', JSON.stringify(notBuys))
        localStorage.setItem('clientLogged', JSON.stringify({ ...isClient, productsCart: notBuys }))
        onClose()
      } else {
        setMessage({
          status: 400,
          message: 'Não há produtos selecionado!'
        })
        setOpenModal(true)
      }

    } else {
      setMessage({
        status: 400,
        message: 'Para prosseguir é necessrio efetuar o Login!'
      })
      setOpenModal(true)
    }
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
                onClick={() => {
                  onClose()
                  setMessage(null)
                }}
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
                      <ItemCart product={product} removeProduct={removeProduct} handleCheck={handleCheck} />
                    )
                  )
                }
              </div>
              {count ? (
                <p className="text-end font-bold text-green ">R${count}</p>
              ) : ''}
              <footer className="flex justify-around mt-5">
                <Button disabled={!products || products?.length === 0} text="Finalizar" type="button" className="text-xs m-0 p-0" onClick={checkout} />
                <Button disabled={!products || products?.length === 0} text="Limpar" type="button" className="text-xs m-0 p-0" onClick={() => {
                  clearCart(),
                    onClose()
                }} />
              </footer>
              {
                (message && openModal) && (
                  <Modal
                    isOpen={openModal}
                    onClose={() => { setOpenModal(false), setMessage(null) }}
                    message={message}
                    button={!isClient && 'Login'}
                    onClick={!isClient && redirect}
                  />
                )
              }

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
