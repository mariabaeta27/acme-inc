import { LoremIpsum } from "lorem-ipsum";

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 2,
    min: 1
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  },
})


export const randomNumber = () => Math.floor(Math.random() * 50)
const descriptionLength = () => Math.floor(Math.random() * (500 - 20) + 20)

export const randomDescription = () => {
  const length = descriptionLength()
  let textLoren = lorem.generateWords(length)

  if (textLoren.length > length) {
    const result = textLoren.slice(0, length)
    return `${result[0].toLocaleUpperCase()}${result.substring(1)}`
  }
}


export const randomImage = async () => {
  const url = 'https://picsum.photos/200/300'
  try {

    const response = await fetch(url)
    return response.url

  } catch (error) {
    return console.error(error.message)
  }


}