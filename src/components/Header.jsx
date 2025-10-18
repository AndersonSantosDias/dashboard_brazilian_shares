import Logo from "./Logo"
import Input from "./Input"
import Button from "./Button"
import { useTheme } from "../context/ThemeContext"
import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const searchContainerRef = useRef(null);

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  }; // pega o valor digitado no input de busca

  useEffect(() => {
    const search = searchValue.trim().toLowerCase(); // remove espaços em branco e converte para minúsculas

    if (search === '') {
      setSearchResults([]);
      return;  // se o valor de busca estiver vazio, limpa os resultados. o reurn impede que o fetch seja chamado
    }

    const debounceTimer = setTimeout(() => {
      const fetchStocks = async () => {
        try {
          const response = await fetch(`https://brapi.dev/api/quote/list?search=${search}&type=stock&limit=7`);
          const data = await response.json();
          setSearchResults(data.stocks || []); // faz a chamada pra API e atualiza os resultados da busca com os dados recebidos ou um array vazio se não houver dados
        } catch (e) {
          console.error(e);
          setSearchResults([]); // em caso de erro, limpa os resultados da busca
        }
      };
      fetchStocks();
    }, 300); // adiciona um debounce de 300ms para evitar muitas chamadas à API enquanto o usuário digita
    return () => clearTimeout(debounceTimer); // limpa o timer do debounce quando o componente é desmontado ou quando o valor de busca muda
  }, [searchValue]);


  useEffect(() => {
    function handleClickOutside(event) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setSearchResults([]); // se o clique for fora do container de busca, limpa os resultados da busca
      }
    }
    document.addEventListener("mousedown", handleClickOutside); // adiciona um listener para detectar cliques fora do container de busca
    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // remove o listener quando o componente é desmontado
    };
  }, [searchContainerRef]);

  const handleSelectStock = () => {
    setSearchValue('');
    setSearchResults([]);
    setIsSearchOpen(false);
  };

  if (isSearchOpen) {
    return (
      <header className="fixed top-0 left-0 w-full flex justify-between items-center h-16 bg-[rgb(var(--color-bg-alt))] text-[rgb(var(--color-text))] shadow-md z-10 px-4 gap-4">
        <div className="relative w-full" ref={searchContainerRef}>
          <Input 
            value={searchValue} 
            onChange={handleSearchChange} 
            placeholder="Buscar pelo Tiker, ex: PETR4, MGLU3..."
          />
          {searchResults.length > 0 && (
            <SearchResultsList results={searchResults} onSelect={handleSelectStock} />
          )}
        </div>
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
      
        <div className="hidden md:block w-1/3 relative" ref={searchContainerRef}>
          <Input 
            value={searchValue} 
            onChange={handleSearchChange} 
            placeholder="Buscar Tiker, ex: PETR4, MGLU3..."
          />
          {searchResults.length > 0 && (
            <SearchResultsList results={searchResults} onSelect={handleSelectStock} />
          )}
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
                <span>{theme === 'dark' ? '🌙' : '☀️'}</span>
                <span className="hidden md:inline">{theme === 'dark' ? 'Tema escuro' : 'Tema claro'}</span>
              </div>
            }/>
        </div>
    </header>
  )
}

const SearchResultsList = ({ results, onSelect }) => (
  <div className="absolute top-full left-0 right-0 mt-2 bg-[rgb(var(--color-bg))] border border-gray-600 rounded-lg shadow-lg max-h-60 overflow-y-auto z-20">
    {results.map((stock) => (
      <Link
        to={`/share/${stock.stock}`}
        key={stock.stock}
        onClick={onSelect}
        className="flex items-center gap-4 p-3 hover:bg-white/10 transition-colors"
      >
        <img 
          src={stock.logo} 
          alt={stock.name} 
          className="w-8 h-8 rounded-full bg-white" // Fundo branco para logos com fundo transparente
        />
        <div>
          <p className="font-bold">{stock.stock}</p>
          <p className="text-xs opacity-70">{stock.name}</p>
        </div>
      </Link>
    ))}
  </div>
);

export default Header
