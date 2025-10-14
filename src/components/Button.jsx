const Button = ({onClick, text, className}) => {
  return (
    <button onClick={onClick} className={`p-2 rounded-full flex justify-center items-center outline-none transition-all ${className}`} >
        {text}
    </button>
  )
}

export default Button
