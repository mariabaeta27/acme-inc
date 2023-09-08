import { Product } from "../../../types/types"

const postCart = (product: Product) => {
  const bdCart = localStorage.getItem('bdCart')
  const clientLogged = localStorage.getItem('clientLogged')
  const client = clientLogged && JSON.parse(clientLogged)

  let updatedCart
  try {
    if (!bdCart) {
      localStorage.setItem('bdCart', JSON.stringify([{ ...product, amount: 1 }]))
      clientLogged && localStorage.setItem('clientLogged', JSON.stringify({ ...client, productsCart: [...client.productsCart, { ...product, amount: 1 }] }))
    } else {

      const cart = JSON.parse(bdCart)
      const productAlreadyExists = cart.some((item) => item.id === product.id)
      const productInCart = cart.find((item) => item.id === product.id)
      if (productAlreadyExists) {
        productInCart.amount += 1
        updatedCart = cart.map((item) => item.id === product.id ? productInCart : item)
      } else {
        updatedCart = [...cart, { ...product, amount: 1 }]
      }
      localStorage.setItem('bdCart', JSON.stringify(updatedCart))
      clientLogged && localStorage.setItem('clientLogged', JSON.stringify({ ...client, productsCart: updatedCart }))
    }
    return {
      status: 200,
      message: `Produto ${product?.name} adicionado no carrinho com sucesso`,
      product: updatedCart
    }
  } catch (error) {
    return {
      status: 400,
      message: `Falha ao adicionar produto ${product?.name} ao carrinho`
    }
  }

}


const clearCart = () => {
  const clientLogged = localStorage.getItem('clientLogged')
  const client = clientLogged && JSON.parse(clientLogged)
  if (client) {
    const newClient = {
      ...client,
      productsCart: []
    }
    localStorage.setItem('clientLogged', JSON.stringify({ ...newClient }))
  }
  localStorage.removeItem('bdCart')
}


const deleteProductCart = (product: Product) => {
  const clientLogged = localStorage.getItem('clientLogged')
  const client = clientLogged && JSON.parse(clientLogged)
  const bdCart = localStorage.getItem('bdCart')
  const cart = bdCart && JSON.parse(bdCart)

  const productInCart = cart.find((item) => item.id === product.id)

  let newCart

  if (productInCart.amount > 1) {
    productInCart.amount -= 1

    newCart = cart.map((item) => item.id === product.id ? productInCart : item)
  } else {
    newCart = cart.filter((prod: Product) => prod?.id !== product.id)
  }

  if (client) {
    const newClient = {
      ...client,
      productsCart: newCart

    }
    localStorage.setItem('clientLogged', JSON.stringify(newClient))
  }
  localStorage.setItem('bdCart', JSON.stringify(newCart))

  return newCart
}


const getProductsCart = () => {
  const products = localStorage.getItem('bdCart')
  return products && JSON.parse(products)
}






export { postCart, clearCart, getProductsCart, deleteProductCart }