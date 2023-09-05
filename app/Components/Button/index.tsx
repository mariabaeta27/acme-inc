import classNames from "classnames"

const Button = ({ text, type = 'button', onClick, disabled = false, className }: { text: string, type: "button" | "submit" | "reset", onClick?: any, disabled?: boolean, className?: string }) => (
  <button
    className={`bg-green p-2 rounded-xl text-green-ligth w-36 m-auto disabled:bg-green-ligth disabled:text-green ${className}`}
    type={type}
    onClick={onClick}
    disabled={disabled}
  >
    {text}
  </button>
)

export default Button