import { ClientComplet, InputsLogin, InputsResgister, Message } from "../../../types/types"
import { v4 as uuidv4 } from 'uuid';

const postClient = (data: InputsResgister): Message => {

  const bgClients = localStorage.getItem('bdClients')

  const client = bgClients && JSON.parse(bgClients)?.filter((client: ClientComplet) => client.email === data.email)


  try {
    if (bgClients && client.length !== 0) {
      throw new Error('Email já cadastrado')
    } else {
      bgClients ?
        localStorage.setItem('bdClients', JSON.stringify([...JSON.parse(bgClients), { ...data, id: uuidv4(), favorites: [], productsCart: [] }])) :
        localStorage.setItem('bdClients', JSON.stringify([{ ...data, id: uuidv4(), favorites: [], productsCart: [] }]))
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

const getClient = (data: InputsLogin) => {
  localStorage.removeItem('client')
  const bgClients = localStorage.getItem('bdClients')
  const isClient = bgClients && JSON.parse(bgClients)?.some((client: InputsResgister) => client.email === data.email)
  const client = bgClients && JSON.parse(bgClients)?.filter((client: InputsResgister) => client.email === data.email && client.password === data.password)

  try {
    if (!isClient) {
      throw new Error('Email não cadastrado')
    } else if (isClient && (!bgClients || client.length === 0)) {
      throw new Error('Email ou senha informados não conferem')
    } else {
      localStorage.setItem('clientLogged', JSON.stringify({ id: client[0]?.id, name: client[0]?.name, favorites: client[0]?.favorites, productsCart: client[0]?.productsCart }))
      return {
        status: 200,
      }
    }
  } catch (error) {
    return {
      status: 400,
      message: error.message
    }
  }

}

const logout = () => {
  const clientLogged = localStorage.getItem('clientLogged')
  const client = clientLogged && JSON.parse(clientLogged)

  const bdClients = localStorage.getItem('bdClients')
  const clients = bdClients && JSON.parse(bdClients)

  const newClients = clients.map((clientArr: ClientComplet) => {
    if (client.id === clientArr.id) {
      return {
        ...clientArr,
        favorites: [...clientArr.favorites, ...client.favorites],
        productsCart: [...clientArr.productsCart, ...client.productsCart]
      }
    } else {
      return clientArr
    }
  })

  console.log(newClients)
  localStorage.setItem('bdClients', JSON.stringify(newClients))

  // localStorage.removeItem('clientLogged')
}


export { postClient, getClient, logout }