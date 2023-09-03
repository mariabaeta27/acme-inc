const Button = ({ text, type = 'button', onClick, disabled = false }: { text: string, type: "button" | "submit" | "reset", onClick?: any, disabled?: boolean }) => (
  <button
    className="bg-green p-2 rounded-xl text-green-ligth w-36 m-auto disabled:bg-green-ligth disabled:text-green"
    type={type}
    onClick={onClick}
    disabled={disabled}
  >
    {text}
  </button>
)

export default Button