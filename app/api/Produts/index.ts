import { adjectives, verbs } from "../../utils/constants"
import { randomNumber, randomDescription, randomImage } from "../../utils/functions"
import { v4 as uuidv4 } from 'uuid';
import { LoremIpsum } from "lorem-ipsum";
import { Product } from "../../../types/types";




const createdProduct = async () => {
  const bdProducts = localStorage.getItem('bdProducts')

  if (!bdProducts) {
    const products = verbs?.map(async () => {
      let verb = verbs[randomNumber()]
      let adjective = adjectives[randomNumber()]
      let description = randomDescription()
      let nameLength = verb.length + adjective.length
      let value = Math.abs((10 + nameLength * ((500 - description.length) / (4 - nameLength)))).toFixed(2)
      let image = await randomImage()
      return {
        id: uuidv4(),
        name: `${verb} ${adjective.toLowerCase()}`,
        description: description,
        value: value,
        image: image

      }
    })
    const result = await Promise.all(products)
    localStorage.setItem('bdProducts', JSON.stringify([...result]))
    return result
  } else {
    return bdProducts && JSON.parse(bdProducts)
  }
}


const getProducts = async () => {
  const products = await createdProduct()
  return products
}


const getProduct = async (id: any) => {
  const products = await createdProduct()
  const product = products.filter((prod: Product) => prod?.id === id)
  return product[0]
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
}

const removeProductFavotrites = (product: Product) => {
  try {
    const clientLogged = localStorage.getItem('clientLogged')
    const client = clientLogged && JSON.parse(clientLogged)

    const favoritesArray = client?.favorites.filter((fav: Product) => fav.id !== product.id)

    localStorage.setItem('clientLogged', JSON.stringify({ ...client, favorites: [...favoritesArray] }))
    return {
      status: 200,
      message: `Produto ${product?.name} removido dos favoritos com sucesso`
    }
  } catch (error) {
    return {
      status: 400,
      message: `Falha ao remover produto ${product?.name} dos favovitos`
    }
  }
}

export { getProducts, getProduct, addProductFavorites, removeProductFavotrites }