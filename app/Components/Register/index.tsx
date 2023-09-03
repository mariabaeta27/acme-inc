'use client'

import { SubmitHandler, useForm } from "react-hook-form"

import Button from "../Button";
import Input from "../Input";
import { postClient } from "../../api/Clients";
import { InputsResgister, Message } from "../../../types/types";
import { useEffect, useState } from "react";
import Loading from "../Loading";

const RegisterComponent = () => {


  const [message, setMessage] = useState<Message | null>()
  const [openModal, setOpenModal] = useState(false)


  useEffect(() => {
    setOpenModal(true)
    console.log(message)
  }, [message])


  const { register, handleSubmit, formState: { errors } } = useForm<InputsResgister>();

  const onSubmit: SubmitHandler<InputsResgister> = async (data: InputsResgister) => {
    setMessage({ message: 'Aguarde...' })
    const result = postClient(data)
    setMessage(result)

  }

  return (
    <>
      <header>
        <h1 className="text-2xl font-medium pb-4 text-green">Crie sua conta</h1>
      </header>
      <div>
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <Input
            label='Nome'
            name='name'
            type="text"
            register={register('name')}
          />
          <Input
            label='Email'
            name='email'
            type="text"
            register={register('email')}
          />
          <Input
            label="Telefone"
            name='phone'
            type="tel"
            register={register('phone')}
          />
          <Input
            label="Senha"
            name="password"
            type="password"
            minLength={5}
            register={register('password')}
          />
          <Button type='submit' text="Cadastar" />
        </form>
      </div>
    </>
  )
}

export default RegisterComponent