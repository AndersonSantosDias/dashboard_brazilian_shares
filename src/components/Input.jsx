

const Input = ({ click, change }) => {
  return (
    <input onClick={click} onChange={change} className="h-10 w-[50vw] px-4 rounded-full bg-[rgb(var(--color-bg))] text-[rgb(var(--color-text))] placeholder:text-[rgb(var(--color-text))] placeholder:opacity-60 border-2 border-transparent focus:border-[rgb(var(--color-primary))] focus:outline-none transition-colors" type="text" placeholder="Digite o Tiker da ação ou Fundo imobiliario" />
  )
}

export default Input
