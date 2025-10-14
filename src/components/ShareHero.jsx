const ShareHero = ({ logo, longName, symbol }) => {
  return (
    <div className="w-full bg-[rgb(var(--color-bg-alt))] border-b border-[rgb(var(--color-bg))] pt-16">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center gap-4 mb-4">
          <img src={logo} alt={longName} className="w-16 h-16 rounded-full bg-white" />
          <div>
            <h1 className="text-3xl font-bold text-[rgb(var(--color-text))]">{longName}</h1>
            <p className="text-lg text-[rgb(var(--color-text))] opacity-80">{symbol}</p>
          </div>
        </div>
        <nav>
          <ul className="flex items-center gap-6 border-t border-[rgb(var(--color-bg))] pt-4">
            <li><a href="#cotacao" className="font-semibold text-[rgb(var(--color-primary))]">Cotação</a></li>
            <li><a href="#indicadores" className="font-semibold text-[rgb(var(--color-primary))]">Indicadores</a></li>
            <li><a href="#dividendos" className="font-semibold text-[rgb(var(--color-primary))]">Dividendos</a></li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default ShareHero;