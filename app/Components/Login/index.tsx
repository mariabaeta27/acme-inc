'use client'
import { useForm } from "react-hook-form";
import Button from "../Button";
import Input from "../Input";
import { InputsLogin, Message } from "../../../types/types";
import { useState } from "react";
import { getClient } from "../../api/Clients";
import Modal from "../Modal";
import { useRouter } from "next/navigation";


const LoginComponent = () => {
  const [message, setMessage] = useState<Message | null>()
  const [openModal, setOpenModal] = useState(false)
  const router = useRouter()

  const { register, handleSubmit, formState: { errors } } = useForm<InputsLogin>();

  const onSubmit = (data: InputsLogin) => {
    const result = getClient(data)
    if (result.status === 200) {
      router.push('/')
    } else {
      setMessage(result)
      setOpenModal(true)
    }
  }

  return (
    <>
      <Modal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        message={message}
      />
      <header>
        <h1 className="text-2xl font-medium pb-4 text-green">Acesse sua conta</h1>
      </header>
      <div>
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <Input
            label='Email'
            name='email'
            type="email"
            register={register('email')}
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
          <Button text="Acessar" type='submit' disabled={openModal} />
        </form>
        <p
          onClick={() => router.push('/register')}
          className="text-center mt-2 color-green underline text-sm hover:cursor-pointer"
        >
          Acesse aqui para se cadastar
        </p>
      </div>
    </>
  )
}

export default LoginComponent