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
  localStorage.removeItem('bdCart')
}


const addProductFavorites = (product: Product) => {
  try {
    const clientLogged = localStorage.getItem('clientLogged')
    const client = clientLogged && JSON.parse(clientLogged)
    let favoritesArray;
    if (client?.favorites.length !== 0) {
      favoritesArray = [...client?.favorites, { ...product }]
    } else {
      favoritesArray = [{ ...product }]
    }
    localStorage.setItem('clientLogged', JSON.stringify({ ...client, favorites: [...favoritesArray] }))
    return {
      status: 200,
      message: `Produto ${product?.name} adicionado ao favoritos com sucesso`
    }
  } catch (error) {
    return {
      status: 400,
      message: `Falha ao adicionar produto ${product?.name} aos favovitos`
    }
  }



  console.log(product)

}






export { postCart, clearCart, addProductFavorites }