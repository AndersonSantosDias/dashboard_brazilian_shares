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
  const [stocksToSearch, setStocksToSearch] = useState([]); // Estado para armazenar os dados das 4 ações
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchContainerRef = useRef(null);

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  // Efeito para buscar os dados (uma vez) e filtrar localmente
  useEffect(() => {
    const fetchInitialStocks = async () => {
      setIsLoading(true);
      try {
        // A API gratuita da brapi não precisa de token para uma lista pequena de ativos
        const response = await fetch('https://brapi.dev/api/quote/PETR4,MGLU3,VALE3,ITUB4');
        const data = await response.json();
        setStocksToSearch(data.results || []);
      } catch (error) {
        console.error("Erro ao buscar dados iniciais das ações:", error);
        setStocksToSearch([]);
      } finally {
        setIsLoading(false);
      }
    };

    const search = searchValue.trim().toLowerCase();

    if (search === '') {
      setSearchResults([]);
      return;
    }

    // Se os dados ainda não foram carregados e o usuário começou a digitar, busca os dados.
    if (stocksToSearch.length === 0) {
      fetchInitialStocks();
    }

    // Filtra os dados já carregados
    const filtered = stocksToSearch.filter(stock => stock.symbol.toLowerCase().includes(search));
    setSearchResults(filtered);

  }, [searchValue, stocksToSearch]);

  // Efeito para fechar a lista de resultados ao clicar fora
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setSearchResults([]);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchContainerRef]);

  const handleSelectStock = () => {
    setSearchValue('');
    setSearchResults([]);
    setIsSearchOpen(false); // Fecha a busca no mobile ao selecionar
  };

  if (isSearchOpen) {
    return (
      <header className="fixed top-0 left-0 w-full flex justify-between items-center h-16 bg-[rgb(var(--color-bg-alt))] text-[rgb(var(--color-text))] shadow-md z-10 px-4 gap-4">
        {/* Input para a busca mobile */}
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
        
        {/* Input para a busca desktop */}
        <div className="hidden md:block w-1/3 relative" ref={searchContainerRef}>
          <Input 
            value={searchValue} 
            onChange={handleSearchChange} 
            placeholder="Buscar pelo Tiker, ex: PETR4, MGLU3..."
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
                <span>{theme === 'light' ? '☀️' : '🌙'}</span>
                <span className="hidden md:inline">{theme === 'light' ? 'Tema claro' : 'Tema escuro'}</span>
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
        to={`/share/${stock.symbol}`}
        key={stock.symbol}
        onClick={onSelect}
        className="flex items-center gap-4 p-3 hover:bg-white/10 transition-colors"
      >
        <img 
          src={stock.logourl} 
          alt={stock.longName} 
          className="w-8 h-8 rounded-full bg-white" // Fundo branco para logos com fundo transparente
        />
        <div>
          <p className="font-bold">{stock.symbol}</p>
          <p className="text-xs opacity-70">{stock.longName}</p>
        </div>
      </Link>
    ))}
  </div>
);

export default Header
