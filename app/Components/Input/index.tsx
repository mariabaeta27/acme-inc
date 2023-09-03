const Input = ({ label, name, type = 'text', register, minLength, disabled = false }:
  { label: string, name: string, type: string, register: any, minLength?: number, disabled?: boolean }) => (
  <>
    <label htmlFor={name} className="text-sm">{label}</label>
    <input
      disabled={disabled}
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