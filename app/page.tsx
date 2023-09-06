'use client'

import { useEffect, useState } from "react"
import { getProducts } from "./api/Produts"
import { Client, Message, Product, ProductWithFavorites } from "../types/types"
import { Alert, CardProduct, Header } from "./Components"


const Home = () => {

  const [products, setProducts] = useState<ProductWithFavorites[] | Product[] | null>()
  const [productFavorites, setProductFavorites] = useState<ProductWithFavorites[] | null>()
  const [isClient, setIsClient] = useState<null | Client>()
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState<Message | null>()

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  useEffect(() => {
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
        setProductFavorites(newProducts)
      } else {
        setProducts(products)
      }
    };
    fetchProducts()
  }, [])


  return (
    <>
      <Header isClient={isClient} />
      <div className="mt-5 grid sm:grid-cols-3 p-1 lg:grid-cols-4 2xl:grid-cols-5">
        {products && products?.map((product: ProductWithFavorites) => (
          <div key={product?.id}>
            <CardProduct
              product={product}
              isClient={isClient}
              setAlertMessage={setAlertMessage}
              openAlert={setShowAlert}
              products={products}
              setProducts={setProducts}
              productFavorites={productFavorites}
              setProductFavorites={setProductFavorites}
            />
          </div>
        ))}
        <Alert
          message={alertMessage}
          onClose={handleAlertClose}
          showAlert={showAlert}
          setShowAlert={setShowAlert}
        />
      </div>
    </>
  )
}

export default Home





