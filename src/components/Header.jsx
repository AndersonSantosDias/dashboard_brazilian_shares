import Logo from "./Logo"
import Input from "./Input"
import Button from "./Button"
import { useTheme } from "../context/ThemeContext"
import { useState } from "react"
import { Link } from "react-router-dom"

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  if (isSearchOpen) {
    return (
      <header className="fixed top-0 left-0 w-full flex justify-between items-center h-16 bg-[rgb(var(--color-bg-alt))] text-[rgb(var(--color-text))] shadow-md z-10 px-4 gap-4">
        <Input />
        <Button 
          className={'bg-transparent text-[rgb(var(--color-text))]'} 
          onClick={() => setIsSearchOpen(false)} 
          text={'Fechar'}
        />
      </header>
    )
  }

 
  return (
    <header className="fixed top-0 left-0 w-full flex justify-between items-center h-16 bg-[rgb(var(--color-bg-alt))] text-[rgb(var(--color-text))] shadow-md z-10 px-4 md:justify-around">
        <Link to="/">
          <Logo />
        </Link>
        
        <div className="hidden md:block">
          <Input />
        </div>

        <div className="flex items-center gap-2">
          <Button 
            className={'bg-transparent text-[rgb(var(--color-text))] md:hidden'} 
            onClick={() => setIsSearchOpen(true)} 
            text={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            }
          />
          
          {/* Botão de Tema */}
          <Button 
            className={'bg-[rgb(var(--color-primary))] text-white font-medium px-3'} 
            onClick={toggleTheme} 
            text={
              <div className="flex items-center gap-2">
                <span>{theme === 'light' ? '☀️' : '🌙'}</span>
                <span className="hidden md:inline">{theme === 'light' ? 'Tema claro' : 'Tema escuro'}</span>
              </div>
            }/>
        </div>
    </header>
  )
}

export default Header
