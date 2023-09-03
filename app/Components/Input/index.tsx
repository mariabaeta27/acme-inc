const Input = ({ label, name }: { label: string, name: string }) => (
  <>
    <label htmlFor={name} className="text-sm">{label}</label>
    <input
      type="text"
      name={name}
      required
      className="w-80 p-0.5 border-2 border-white border-b-green-ligth rounded mb-4 focus:outline-none focus:border-b-green focus:border-2"
    />
  </>
)
export default Input