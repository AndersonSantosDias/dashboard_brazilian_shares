import { createContext, useState, useEffect, useContext } from "react";
const ThemeContext = createContext();


export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => { // inicia o estado com o que tiver no localStorage ou vazio
    return localStorage.getItem("theme") || "";
  })
  const toggleTheme = () => {
    setTheme(prev => (prev === "" ? "dark" : ""));
  }; // alterna entre tema claro e escuro

    useEffect(() => { // atualiza o localStorage sempre que o tema mudar
      localStorage.setItem("theme", theme);
    }, [theme]);

  return ( // fornece o contexto para os componentes filhos
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() { // retorna o contexto como um hook personalizado
  return useContext(ThemeContext);
}
