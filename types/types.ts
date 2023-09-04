export type InputsResgister = {
  name: string,
  email: string,
  phone: string,
  password: string
}

export type Message = {
  message?: string
  status?: number,
}

export type InputsLogin = {
  email: string,
  password: string
}