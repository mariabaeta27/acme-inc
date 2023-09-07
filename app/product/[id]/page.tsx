'use client'
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getProduct } from '../../api/Produts';
import { Message, Product, ProductWithFavorites } from '../../../types/types';
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid"
import { HeartIcon } from "@heroicons/react/24/outline"
import { addProductFavorites, postCart, removeProductFavotrites } from '../../api/Ecomerce';
import Button from '../../Components/Button';
import { Alert, Loading } from '../../Components';

const Product = () => {
  const params = useParams()
  const [product, setProuct] = useState<ProductWithFavorites | null>()
  const [loading, setLoading] = useState(true)
  const [isClient, setIsClient] = useState()
  const [alertMessage, setAlertMessage] = useState<Message | null>()
  const [showAlert, setShowAlert] = useState(false);
  const [isFavorite, setIsFavorite] = useState(product?.isFavorite);

  useEffect(() => {
    setLoading(true)
    const client = localStorage.getItem('clientLogged')
    setIsClient(client && JSON.parse(client))
    const favorites = client && JSON.parse(client).favorites
    const fetchProduct = async () => {
      const productSelect = await getProduct(params?.id)
      const isFavorite = favorites?.some((fav: Product) => fav.id === productSelect.id)
      setProuct({ ...productSelect, isFavorite: isFavorite })
    }
    fetchProduct()
    setLoading(false)
  }, [])

  const handleAlertClose = () => {
    setShowAlert(true);
    setAlertMessage(null)
  };

  const isClientStyle = isClient ? 'text-green' : 'text-green-ligth'
  const heartIcon = isFavorite ? <HeartIconSolid className={`h-5 w-5 mx-2 ${isClientStyle}`} /> : <HeartIcon className={`h-5 w-5 mx-2 ${isClientStyle}`} />

  const addProductCart = (productSelect: ProductWithFavorites) => {
    const result = postCart(productSelect)
    setAlertMessage(result)
    setShowAlert(true)
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleFavorite = (productSelect: ProductWithFavorites) => {

    if (isFavorite) {

      delete product.isFavorite
      const result = removeProductFavotrites(productSelect)
      setAlertMessage(result)
    } else {
      delete product.isFavorite
      const result = addProductFavorites(productSelect)
      setAlertMessage(result)
    }
    setShowAlert(true)
    toggleFavorite()
  }

  return (


    <>
      {
        loading ? (<Loading />) :
          (<div
            className="m-3 rounded-md shadow-sm w-auto h-34 flex justify-center items-center  bg-bege/35 hover:shadow-md bg-green-ligth/30"
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

              <p className="text-lg text-green font-semibold mb-1.5">{product?.name}</p>

              <p className="line-clamp-2 text-xs text-justify text-gray mr-2">{product?.description}</p>
              <p className="text-end mt-3 mr-2 font-bold text-green">R${product?.value}</p>
              <div className="flex">
                <Button text="Adicionar ao carrinho" type="button" className="text-xs my-3" onClick={() => addProductCart(product)} />
                <button onClick={() => handleFavorite(product)} disabled={!isClient ? true : false}>
                  {heartIcon}
                </button>
              </div>
            </div>
            {
              alertMessage && (
                <Alert
                  message={alertMessage}
                  onClose={handleAlertClose}
                  showAlert={showAlert}
                  setShowAlert={setShowAlert}

                />)
            }


          </div>)

      }
    </>



  )
}

export default Product