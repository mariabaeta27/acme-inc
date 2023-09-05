import { Product } from "../../../types/types"

const postCart = (product: Product) => {
  const bgCart = localStorage.getItem('bgCart')
  try {

    if (!bgCart) {
      localStorage.setItem('bgCart', JSON.stringify([{ ...product }]))
    } else {
      localStorage.setItem('bgCart', JSON.stringify([...JSON.parse(bgCart), { ...product }]))
    }
    return {
      status: 200,
      message: `Produto ${product?.name} adicionado no carrinho com sucesso`
    }
  } catch (error) {
    return {
      status: 400,
      message: `Falha ao adicionar produto ${product?.name} ao carrinho`
    }
  }
}


const clearCart = () => {
  localStorage.removeItem('bgCart')
}

export { postCart, clearCart }