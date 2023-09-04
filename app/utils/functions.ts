export const randomNumber = () => Math.floor(Math.random() * 50)
const descriptionLength = () => Math.random() * (500 - 20) + 20;

export const randomDescription = () => {
  let result = '';
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < descriptionLength()) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return `${result[0].toLocaleUpperCase()}${result.substring(1)}`;
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