'use client'

import { useEffect, useState } from "react"
import { getProducts } from "./api/Produts"
import { Client, Product } from "../types/types"
import { CardProduct, Header } from "./Components"


const Home = () => {

  const [products, setProducts] = useState<Product[] | null>()
  const [isClient, setIsClient] = useState<null | Client>()

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts();
      setProducts(products)
    };
    fetchProducts()
  }, [])

  useEffect(() => {
    const client = localStorage.getItem('client')
    setIsClient(client && JSON.parse(client))
  }, [])


  return (
    <>
      <Header isClient={isClient} />
      <div className="mt-5 grid sm:grid-cols-3 p-1 lg:grid-cols-4 2xl:grid-cols-5">
        {products && products?.map((product: Product) => (
          <div key={product?.id}>
            <CardProduct product={product} isClient={isClient} />
          </div>
        ))}
      </div>
    </>
  )
}

export default Home





