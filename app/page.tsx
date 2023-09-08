'use client'

import { useEffect, useState } from "react"
import { getProducts } from "./api/Produts"
import { Client, Message, Product, ProductComplet, ProductWithBuy, ProductWithFavorites } from "../types/types"
import { Alert, CardProduct, Cart, Filters, Header, Loading } from "./Components"



const Home = () => {
  const [products, setProducts] = useState<ProductWithFavorites[] | Product[] | null>()
  const [productFavorites, setProductFavorites] = useState<ProductWithFavorites[] | null>()
  const [productsFilters, setProductsFilters] = useState<ProductWithFavorites[] | Product[] | null>()
  const [isClient, setIsClient] = useState<null | Client>()
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState<Message | null>()
  const [loading, setLoading] = useState(true)
  const [isChecked, setIsChecked] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [buys, setBuys] = useState()


  useEffect(() => {
    setLoading(true)
    const clientLogged = localStorage.getItem('clientLogged')
    const client = JSON.parse(clientLogged)
    setIsClient(client && client)
    const favorites = clientLogged && client.favorites
    const buys = clientLogged && client.productsCart



    const fetchProducts = async () => {
      const bdProducts = await getProducts();
      const newProducts = bdProducts?.map((product: Product) => {
        const isFavorite = favorites?.some((fav: Product) => fav.id === product.id)
        const isBusy = buys?.some((buy: Product) => buy.id === product.id)
        return {
          ...product,
          isFavorite: isFavorite || false,
          buy: isBusy || false
        }
      })
      const newFavorites = newProducts?.filter((product: ProductWithFavorites) => product.isFavorite)
      const newBuys = newProducts?.filter((product: ProductWithBuy) => product.buy)
      setProducts(newProducts)
      setProductsFilters(newProducts)
      setProductFavorites(newFavorites)
      setBuys(newBuys)
    };
    fetchProducts()
    setLoading(false)
  }, [])


  const handleAlertClose = () => {
    setShowAlert(true);
    setAlertMessage(null)
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <>
      {loading ? (<Loading />) : (
        <>
          <Header isClient={isClient} setIsDrawerOpen={setIsDrawerOpen} />
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
          <div className="mt-5 grid sm:grid-cols-3 p-1 lg:grid-cols-4 xl:grid-cols-5">
            {(!productsFilters || productsFilters?.length === 0) ? (
              <div className="flex justify-center items-center w-screen">
                <p className="text-center text-green text-lg font-bold">Não há produtos para serem exebidos</p>
              </div>
            ) :
              productsFilters?.map((product: ProductComplet) => (
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
                    setBuys={setBuys}
                  />
                </div>
              ))}

            {alertMessage && (
              <Alert
                message={alertMessage}
                onClose={handleAlertClose}
                showAlert={showAlert}
                setShowAlert={setShowAlert}
              />)}

            <div>
              <Cart isOpen={isDrawerOpen} onClose={closeDrawer} buys={buys} />
            </div>

          </div>
        </>
      )}
    </>
  )
}

export default Home





