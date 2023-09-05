'use client'
import { SubmitHandler, useForm } from "react-hook-form"
import { useRouter } from 'next/navigation';
import Button from "../Button";
import Input from "../Input";
import { postClient } from "../../api/Clients";
import { InputsResgister, Message } from "../../../types/types";
import { useState } from "react";
import Modal from "../Modal";

const RegisterComponent = () => {

  const [message, setMessage] = useState<Message | null>()
  const [openModal, setOpenModal] = useState(false)
  const router = useRouter()


  const { register, handleSubmit, formState: { errors }, reset } = useForm<InputsResgister>();

  const onSubmit: SubmitHandler<InputsResgister> = async (data: InputsResgister) => {
    const result = postClient(data)
    setOpenModal(true)
    setMessage(result)
  }

  return (
    <>
      <Modal
        isOpen={openModal}
        onClose={() => (
          reset(),
          setOpenModal(false)
        )}
        message={message}
        button={message?.message !== 'Email já cadastrado' && 'Login'}
        onClick={() => router.push('/login')}
      />
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
            disabled={openModal}
          />
          <Input
            label='Email'
            name='email'
            type="email"
            register={register('email')}
            disabled={openModal}
          />
          <Input
            label="Telefone"
            name='phone'
            type="tel"
            register={register('phone')}
            disabled={openModal}
          />
          <Input
            label="Senha"
            name="password"
            type="password"
            minLength={5}
            register={register('password')}
            disabled={openModal}
          />
          <div className="flex">
            <Button type='submit' text="Cadastar" disabled={openModal} />
            <Button type='button' text="Voltar" disabled={openModal} onClick={() => router.push('/login')} />
          </div>
        </form>
      </div>
    </>
  )
}

export default RegisterComponent