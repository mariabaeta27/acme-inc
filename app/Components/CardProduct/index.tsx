'use client'
import { HeartIcon } from "@heroicons/react/24/outline"
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid"
import { Client, Product, ProductComplet, ProductWithFavorites } from "../../../types/types"
import Button from "../Button"
import { deleteProductCart, postCart } from "../../api/Ecomerce"
import { useState } from "react"
import Link from "next/link"
import { addProductFavorites, removeProductFavotrites } from "../../api/Produts"

const CardProduct = ({
  product,
  isClient,
  setAlertMessage,
  openAlert,
  products,
  setProducts,
  favorites,
  setProductFavorites,
  isChecked,
  setBuys,
}:
  {
    product: ProductComplet,
    isClient: Client,
    setAlertMessage: any,
    openAlert: any,
    products: ProductComplet[] | Product[],
    setProducts: any,
    favorites: Product[],
    setProductFavorites: any,
    isChecked: boolean,
    setBuys: any,
  }) => {

  const [isFavorite, setIsFavorite] = useState(product?.isFavorite);
  const [textButton, setText] = useState<string>(product.buy ? 'Remover do carrinho' : 'Adicionar ao carrinho')

  const isClientStyle = isClient ? 'text-green' : 'text-green-ligth'
  const heartIcon = isFavorite ? <HeartIconSolid className={`h-5 w-5 mx-2 ${isClientStyle}`} /> : <HeartIcon className={`h-5 w-5 mx-2 ${isClientStyle}`} />

  const addProductCart = (productSelect: ProductComplet) => {
    const result = postCart(productSelect)
    setText('Remover do carrinho')
    setAlertMessage(result)
    openAlert(true)
  }

  const removeProduct = (productSelect: ProductComplet) => {
    const result = deleteProductCart(productSelect)
    setText('Adicionar ao carrinho')
    setAlertMessage(result)
    openAlert(true)
  }

  const handleBuys = (productSelect: ProductComplet) => {

    const newProducts = products?.map((product: ProductComplet) => {
      if (product.id === productSelect.id) {
        return {
          ...productSelect,
          buy: !productSelect.buy
        }
      } else {
        return product
      }
    })
    setProducts(newProducts)
    const newBuys = newProducts?.filter((product: ProductComplet) => product.buy)
    setBuys(newBuys)
    console.log(newBuys)

    if (productSelect.buy) {
      removeProduct(productSelect)
    } else {
      addProductCart(productSelect)
    }
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleFavorite = (productSelect: ProductWithFavorites) => {
    const newProducts = products?.map((product: ProductWithFavorites) => {
      if (product.id === productSelect.id) {
        return {
          ...productSelect,
          isFavorite: !productSelect.isFavorite
        }
      } else {
        return product
      }
    })
    setProducts(newProducts)

    if (isFavorite) {
      const newFavorites = favorites.filter((productFavorite) => productFavorite.id !== productSelect.id)
      setProductFavorites(newFavorites)
      isChecked && setProducts(newFavorites)
      delete product.isFavorite
      delete product.buy
      const result = removeProductFavotrites(productSelect)
      setAlertMessage(result)
    } else {
      delete product.isFavorite
      delete product.buy
      setProductFavorites([...favorites, { ...productSelect }])
      const result = addProductFavorites(productSelect)
      setAlertMessage(result)
    }
    openAlert(true)
    toggleFavorite()
  }

  return (
    <div
      className="m-3 rounded-md shadow-sm w-auto h-34 flex bg-bege/35 bg-green-ligth/30 hover:shadow-md"
      key={product?.id}
    >
      <div className=" mr-2">
        <img
          src={product?.image}
          alt={product?.name}
          className="h-32 w-40 rounded-md ml-0.5 mt-0.5"
          width='auto'
          height='auto'
        />
      </div>
      <div className="w-60 overflow-hidden">
        <Link href={`/product/${product.id}`}>
          <p className="text-lg text-green font-semibold mb-1.5">{product?.name}</p>
        </Link>
        <p className="line-clamp-2 text-xs text-justify text-gray mr-2">{product?.description}</p>
        <p className="text-end mt-3 mr-2 font-bold text-green">R${product?.value}</p>
        <div className="flex">
          <Button text={textButton} type="button" className="text-xs my-3" onClick={() => handleBuys(product)} />
          <button onClick={() => handleFavorite(product)} disabled={!isClient ? true : false}>
            {heartIcon}
          </button>
        </div>
      </div>
    </div>
  )
}

export default CardProduct