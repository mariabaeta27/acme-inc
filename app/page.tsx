'use client'

import { useEffect, useState } from "react"
import { getProducts } from "./api/Produts"
import { Client, Message, Product, ProductWithFavorites } from "../types/types"
import { Alert, CardProduct, Filters, Header, Loading } from "./Components"


const Home = () => {

  const [products, setProducts] = useState<ProductWithFavorites[] | Product[] | null>()
  const [productFavorites, setProductFavorites] = useState<ProductWithFavorites[] | null>()
  const [productsFilters, setProductsFilters] = useState<ProductWithFavorites[] | Product[] | null>()
  const [isClient, setIsClient] = useState<null | Client>()
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState<Message | null>()
  const [loading, setLoading] = useState(true)
  const [isChecked, setIsChecked] = useState(false);

  const handleAlertClose = () => {
    setShowAlert(true);
    setAlertMessage(null)
  };

  useEffect(() => {
    setLoading(true)
    const client = localStorage.getItem('clientLogged')
    setIsClient(client && JSON.parse(client))
    const favorites = client && JSON.parse(client).favorites
    const fetchProducts = async () => {
      const products = await getProducts();
      if (favorites?.lenght !== 0) {
        const newProducts = products?.map((product: Product) => {
          const isFavorite = favorites?.some((fav: Product) => fav.id === product.id)
          return {
            ...product,
            isFavorite: isFavorite || false
          }
        })
        setProducts(newProducts)

        const newFavorites = newProducts.filter((product: ProductWithFavorites) => product.isFavorite)
        setProductFavorites(favorites)
        setProductsFilters(isChecked ? newFavorites : newProducts)
      } else {
        setProducts(products)
      }
    };
    fetchProducts()
    setLoading(false)
  }, [])



  return (
    <>
      {loading ? (<Loading />) : (
        <>
          <Header isClient={isClient} />
          <Filters
            products={products}
            setProducts={setProductsFilters}
            favorites={productFavorites}
            isClient={isClient}
            isChecked={isChecked}
            setIsChecked={setIsChecked}
          />
          <div>
          </div>
          <div className="mt-5 grid sm:grid-cols-3 p-1 lg:grid-cols-4 2xl:grid-cols-5">
            {!productsFilters || productsFilters.length === 0 ? (
              <div className="flex justify-center items-center w-screen">
                <p className="text-center text-green text-lg font-bold">Não há produtos para serem exebidos</p>
              </div>
            ) : productsFilters?.map((product: ProductWithFavorites) => (
              <div key={product?.id}>
                <CardProduct
                  product={product}
                  isClient={isClient}
                  setAlertMessage={setAlertMessage}
                  openAlert={setShowAlert}
                  products={productsFilters}
                  setProducts={setProductsFilters}
                  favorites={productFavorites}
                  setProductFavorites={setProductFavorites}
                  isChecked={isChecked}
                />
              </div>
            ))}

            {alertMessage && (<Alert
              message={alertMessage}
              onClose={handleAlertClose}
              showAlert={showAlert}
              setShowAlert={setShowAlert}
            />)}

          </div>
        </>
      )}
    </>
  )
}

export default Home





