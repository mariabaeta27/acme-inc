// import { SubmitHandler, useForm } from "react-hook-form"

import Button from "../Button";
import Input from "../Input";

// type Inputs = {
//   name: string,
//   email: string,
//   phone: string,
//   password: string
// }


type Inputs = {
  example: string,
  exampleRequired: string,
};

const LoginComponent = () => {
  // const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

  // const onSubmit: SubmitHandler<Inputs> = (data) => {
  //   console.log(data)
  // }

  return (
    <>
      <header>
        <h1 className="text-2xl font-medium pb-4 text-green">Acesse sua conta</h1>
      </header>
      <div>
        <form className="flex flex-col">
          <Input
            label='Email'
            name='email'
          />
          <Input
            label="Senha"
            name="password"
          />
          <Button text="Acessar" />
        </form>
      </div>
    </>
  )
}

export default LoginComponent