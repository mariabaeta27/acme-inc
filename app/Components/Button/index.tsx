const Button = ({ text, type = 'button', onClick }: { text: string, type: "button" | "submit" | "reset", onClick?: any }) => (
  <button
    className="bg-green p-2 rounded-xl text-green-ligth w-36 m-auto"
    type={type}
    onClick={onClick}
  >
    {text}
  </button>
)

export default Button