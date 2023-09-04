import { Product } from "../../../types/types"

const CardProduct = ({ product }: { product: Product }) => {
  return (
    <div className="m-1 rounded-md shadow-lg ">
      {product.name}
    </div>
  )
}

export default CardProduct