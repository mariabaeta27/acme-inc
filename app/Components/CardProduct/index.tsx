'use client'
import { HeartIcon } from "@heroicons/react/24/outline"
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid"
import { Client, Product, ProductWithFavorites } from "../../../types/types"
import Button from "../Button"
import { addProductFavorites, postCart, removeProductFavotrites } from "../../api/Ecomerce"
import { useState } from "react"

const CardProduct = ({
  product,
  isClient,
  setAlertMessage,
  openAlert,
  products,
  setProducts,
  productFavorites,
  setProductFavorites,
}:
  {
    product: ProductWithFavorites,
    isClient: Client,
    setAlertMessage: any,
    openAlert: any,
    products: ProductWithFavorites[] | Product[],
    setProducts: any,
    productFavorites: Product[],
    setProductFavorites: any
  }) => {


  const [isFavorite, setIsFavorite] = useState(product?.isFavorite);

  const isClientStyle = isClient ? 'text-green' : 'text-green-ligth'
  const heartIcon = isFavorite ? <HeartIconSolid className={`h-5 w-5 mx-2 ${isClientStyle}`} /> : <HeartIcon className={`h-5 w-5 mx-2 ${isClientStyle}`} />

  const addProductCart = (productSelect: ProductWithFavorites) => {
    const result = postCart(productSelect)
    setAlertMessage(result)
    openAlert(true)
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };


  const addFavorites = (productFav: ProductWithFavorites) => {

    const newProducts = products?.map((productEdit: ProductWithFavorites) => {
      if (productFav?.id === productEdit?.id) {
        return {
          ...productEdit,
          isFavorite: !productEdit?.isFavorite
        }
      }
      return {
        ...productEdit
      }
    })
    setProducts(newProducts)

    if (isFavorite) {
      setProductFavorites([...productFavorites, { productFav }])
      delete productFav.isFavorite
      const result = removeProductFavotrites(productFav)
      setAlertMessage(result)
      openAlert(true)
    } else {
      const newFavorites = productFavorites?.filter((fav) => fav.id !== productFav.id)
      setProductFavorites(newFavorites)
      delete productFav.isFavorite
      const result = addProductFavorites(productFav)
      setAlertMessage(result)
      openAlert(true)
    }

    toggleFavorite()
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
          <button onClick={() => addFavorites(product)} disabled={!isClient ? true : false}>
            {heartIcon}
          </button>
        </div>
      </div>
    </div>
  )
}

export default CardProduct