const Input = ({ label, name, type = 'text', register, minLength, }:
  { label: string, name: string, type: string, register: any, minLength?: number, }) => (
  <>
    <label htmlFor={name} className="text-sm">{label}</label>
    <input
      type={type}
      name={name}
      required
      minLength={minLength}
      className="w-80 p-0.5 border-2 border-white border-b-green-ligth rounded mb-4 focus:outline-none focus:border-b-green focus:border-2"
      {...register}
    />
  </>
)
export default Input