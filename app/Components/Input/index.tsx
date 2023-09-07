const Input = ({
  label,
  name,
  type = 'text',
  register,
  minLength,
  disabled = false,
  className,
  onChange,
  icon,
  value,
  placeholder,
  checked,
}:
  {
    name: string,
    type: string,
    label?: string,
    register?: any,
    minLength?: number,
    disabled?: boolean,
    className?: string,
    onChange?: any,
    icon?: any,
    value?: string,
    placeholder?: string,
    checked?: boolean,
  }) => (
  <>
    <div className="flex">
      <label htmlFor={name} className="text-sm text-green">{label}</label>
      <input
        checked={checked}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        type={type}
        name={name}
        required
        minLength={minLength}
        className={`w-50 p-0.5 border-2 border-white border-b-green-ligth rounded mb-4 sm:w-80 focus:outline-none focus:border-b-green focus:border-2 text-green ${className}`}
        {...register}
      />
      {icon && (
        <>
          {icon}
        </>
      )}
    </div>
  </>
)
export default Input