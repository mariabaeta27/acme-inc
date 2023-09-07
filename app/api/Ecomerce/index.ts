import { Product } from "../../../types/types"

const postCart = (product: Product) => {
  const bdCart = localStorage.getItem('bdCart')
  const clientLogged = localStorage.getItem('clientLogged')
  const client = clientLogged && JSON.parse(clientLogged)

  try {
    if (!bdCart) {
      localStorage.setItem('bdCart', JSON.stringify([{ ...product }]))
      clientLogged && localStorage.setItem('clientLogged', JSON.stringify({ ...client, productsCart: [...client.productsCart, { ...product }] }))
    } else {
      localStorage.setItem('bdCart', JSON.stringify([...JSON.parse(bdCart), { ...product }]))
      clientLogged && localStorage.setItem('clientLogged', JSON.stringify({ ...client, productsCart: [...client.productsCart, { ...product }] }))
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
  const clientLogged = localStorage.getItem('clientLogged')
  const client = clientLogged && JSON.parse(clientLogged)

  if (client) {
    console.log(client)
    const newClient = {
      ...client,
      productsCart: []
    }
    localStorage.setItem('clientLogged', JSON.stringify({ ...newClient }))
  } else {
    localStorage.removeItem('bdCart')
  }
}




const getProductsCart = () => {
  const products = localStorage.getItem('bdCart')
  return products && JSON.parse(products)
}






export { postCart, clearCart, getProductsCart }