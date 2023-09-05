'use client'

import { useEffect, useState } from "react"
import { getProducts } from "./api/Produts"
import { ShoppingBagIcon } from "@heroicons/react/24/outline"
import { Product } from "../types/types"
import { CardProduct } from "./Components"

const Home = () => {

  const [products, setProducts] = useState<Product[] | null>()

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts();
      setProducts(products)
      console.log(products);
    };
    fetchProducts()
  }, [])



  return (
    <>
      <header className='grid grid-cols-2 gap-2'>
        <div className="col-span-2 text-end">
          <button>
            <ShoppingBagIcon className="h-6 w-6 color-green" />
          </button>
        </div>
        <div>
          <h1 className="text-green text-4xl font-semibold">Hello</h1>
          <p className="text-green text-2xl font-medium">User</p>
        </div>
      </header>
      <div className="mt-5 grid sm:grid-cols-3 p-1 lg:grid-cols-4 2xl:grid-cols-5">

        {products && products?.map((product: Product) => (
          <div key={product?.id}>
            <CardProduct product={product} />
          </div>
        ))}



      </div>
    </>
  )
}

export default Home





