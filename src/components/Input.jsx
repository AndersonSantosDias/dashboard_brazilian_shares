
const Input = ({ value, onChange, placeholder }) => {
  return (
    <input 
      type="text" 
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="h-10 w-full px-4 rounded-full bg-[rgb(var(--color-bg))] text-[rgb(var(--color-text))] placeholder:text-[rgb(var(--color-text))] placeholder:opacity-60 border-2 border-transparent focus:border-[rgb(var(--color-primary))] focus:outline-none transition-colors" 
    />
  )
}

export default Input
