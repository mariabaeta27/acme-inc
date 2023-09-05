import { adjectives, verbs } from "../../utils/constants"
import { randomNumber, randomDescription, randomImage } from "../../utils/functions"
import { v4 as uuidv4 } from 'uuid';
import { LoremIpsum } from "lorem-ipsum";




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

export { getProducts }