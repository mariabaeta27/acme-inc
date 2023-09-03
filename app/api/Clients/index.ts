import { InputsResgister } from "../../../types/types"
import { v4 as uuidv4 } from 'uuid';

const postClient = (data: InputsResgister) => {

  const bgClients = localStorage.getItem('bdClients')

  const client = bgClients && JSON.parse(bgClients)?.filter((client: InputsResgister) => client.email === data.email)


  try {
    if (bgClients && client.length !== 0) {
      throw new Error('Email já cadastrado')
    } else {
      bgClients ?
        localStorage.setItem('bdClients', JSON.stringify([...JSON.parse(bgClients), { ...data, id: uuidv4() }])) :
        localStorage.setItem('bdClients', JSON.stringify([{ ...data, id: uuidv4() }]))
      return {
        status: 200,
        message: 'Cadastro realizado com sucesso!'
      }
    }
  } catch (error) {
    return {
      status: 400,
      message: error.message
    }
  }
}


export { postClient }