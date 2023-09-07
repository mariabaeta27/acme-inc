'use client'
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getProduct } from '../../api/Produts';
import { Message, Product, ProductWithFavorites } from '../../../types/types';
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid"
import { ChevronLeftIcon, HeartIcon } from "@heroicons/react/24/outline"
import { addProductFavorites, postCart, removeProductFavotrites } from '../../api/Ecomerce';
import Button from '../../Components/Button';
import { Alert, Cart, Loading } from '../../Components';
import IconcCart from '../../Components/IconCart';

const Product = () => {
  const params = useParams()
  const [product, setProuct] = useState<ProductWithFavorites | null>()
  const [loading, setLoading] = useState(true)
  const [isClient, setIsClient] = useState()
  const [alertMessage, setAlertMessage] = useState<Message | null>()
  const [showAlert, setShowAlert] = useState(false);
  const [isFavorite, setIsFavorite] = useState(product?.isFavorite);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const router = useRouter()

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

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (


    <>
      {
        loading ? (<Loading />) :
          (
            <div
              className=" w-full sm:grid sm:grid-cols-4 lg:grid-cols-4 lg:gap-1 xl:grid-cols-5 xl:gap-2"
            >
              <div className='flex justify-between col-span-4 xl:col-span-5'>
                <button onClick={() => router.back()} disabled={!isClient ? true : false}>
                  <ChevronLeftIcon className='h-5 w-5 text-green' />
                </button>
                <IconcCart setIsDrawerOpen={setIsDrawerOpen} />
              </div>
              <div className='mb-3 sm:mb-0 sm:col-span-1 '>
                <p className="text-lg text-green font-medium mb-1.5">{product?.name}</p>
                <img
                  src={product?.image}
                  alt={product?.name}
                  className="h-48 w-64 mt-0.5"
                  width='auto'
                  height='auto'
                />
              </div>

              <div className='sm:col-span-2 sm:h-32 sm:mt-20'>
                <p className="text-xs text-justify text-gray mr-2 ">{product?.description}</p>
                <div className="flex content-end mt-5 justify-between">
                  <Button text="Adicionar ao carrinho" type="button" className="text-xs m-0 p-0" onClick={() => addProductCart(product)} />
                  <button onClick={() => handleFavorite(product)} disabled={!isClient ? true : false}>
                    {heartIcon}
                  </button>
                  <p className="mt-5 font-bold text-green">R${product?.value}</p>
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
              <Cart isOpen={isDrawerOpen} onClose={closeDrawer} />
            </div>)

      }
    </>



  )
}

export default Product