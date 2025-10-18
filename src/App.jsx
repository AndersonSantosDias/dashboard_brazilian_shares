// App.jsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import Home from "./pages/Home";
import Share from "./pages/Share";

function AppContent() {
  const { theme } = useTheme();
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/share/:ticker" element={<Share />} />
        </Routes>
      </Router>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
