'use client'

import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

import { clearCart, deleteProductCart, getProductsCart, postCart } from "../../api/Ecomerce";
import ItemCart from "../ItemCart";
import Button from "../Button";

import Modal from "../Modal";
import { useRouter } from "next/navigation";

const Cart = ({
  isOpen,
  onClose,
}) => {

  const router = useRouter()
  const [isClient, setIsClient] = useState<null | any>()
  const [openModal, setOpenModal] = useState(false)
  const [message, setMessage] = useState<any | null>()
  const [count, setCount] = useState<number>()
  const [buys, setBuys] = useState<any[]>()


  useEffect(() => {
    const client = localStorage.getItem('clientLogged')
    setIsClient(client && JSON.parse(client))

    const fetchProducts = async () => {
      const result = getProductsCart()
      const newProducts = result?.map((prod) => ({ ...prod, buy: false }))
      setBuys(newProducts)
      let countReult = 0;
      result?.forEach((buy: any) => {
        countReult = countReult + (parseFloat(buy?.value) * buy?.amount)
      });
      setCount(countReult)
    }
    fetchProducts()
  }, [isOpen])

  const removeProduct = (productSelect: any) => {
    const updatedCart = deleteProductCart(productSelect)
    setBuys(updatedCart)
    const newCount = (count - parseFloat(productSelect?.value))
    setCount(+newCount)
  }

  const addProduct = (productSelect: any) => {
    const updatedCart = postCart(productSelect)
    setBuys(updatedCart.product)
    const newCount = (count + parseFloat(productSelect?.value))
    setCount(+newCount)
  }


  const handleCheck = (product: any, event) => {

    const newProducts = buys?.map((prod) => {
      if (product.id === prod.id) {
        return {
          ...prod,
          buy: !prod.buy
        }
      }
      return prod
    })
    setBuys(newProducts)
    setMessage(null)
  }

  const redirect = () => {
    router.push('/login')
  }

  const checkout = () => {

    const buysCompleted = localStorage.getItem('buysCompleted')
    const bdBuys = buysCompleted && JSON.parse(buysCompleted)
    const prodcutsSelected = buys.filter((product) => product.buy)
    const prodcutsNotSelected = buys?.filter((product) => !product.buy && product)

    if (isClient) {
      if (prodcutsSelected.length) {
        if (bdBuys) {
          localStorage.setItem('buysCompleted', JSON.stringify([...bdBuys, { client: { ...isClient }, buys: { ...prodcutsNotSelected } }]))
        } else {
          localStorage.setItem('buysCompleted', JSON.stringify([{ client: { ...isClient }, buys: { ...prodcutsNotSelected } }]))
        }
        setBuys(prodcutsNotSelected)
        localStorage.setItem('bdCart', JSON.stringify([...prodcutsNotSelected]))
        localStorage.setItem('clientLogged', JSON.stringify({ ...isClient, productsCart: prodcutsNotSelected }))

        setMessage({
          status: 200,
          message: 'Compra finalizada com sucesso!'
        })
        setOpenModal(true)
        const timer = setTimeout(() => {
          setOpenModal(false)
          setMessage(null)
          onClose();
        }, 2000);

        return () => clearTimeout(timer);

      } else {
        setMessage({
          status: 400,
          message: 'Não há produtos selecionado!'
        })
      }

    } else {
      setMessage({
        status: 400,
        message: 'Para prosseguir é necessário efetuar o Login!'
      })
    }
    setOpenModal(true)

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
                {!buys || buys?.length === 0 ?
                  (
                    <div className="flex justify-center items-center w-full">
                      <p className="text-center text-green text-lg font-bold">Não há produtos para serem exebidos</p>
                    </div>) :
                  (
                    buys?.map((product) =>
                      <div key={product.id}>
                        <ItemCart product={product} removeProduct={removeProduct} handleCheck={handleCheck} addProduct={addProduct} />
                      </div>
                    )
                  )
                }
              </div>
              {buys && buys.length !== 0 && count ? (
                <p className="text-end font-bold text-green">
                  Total:
                  <span className="ml-2">R${count.toFixed(2)}</span>
                </p>
              ) : ''}
              <footer className="flex justify-around mt-5">
                <Button disabled={!buys || buys?.length === 0} text="Finalizar" type="button" className="text-xs m-0 p-0" onClick={checkout} />
                <Button disabled={!buys || buys?.length === 0} text="Limpar" type="button" className="text-xs m-0 p-0" onClick={() => {
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
