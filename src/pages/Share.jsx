import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import ShareHero from "../components/ShareHero";
import IndicatorCard from "../components/IndicatorCard";
import IndicatorList from "../components/IndicatorList";
import DividendChart from "../components/DividendChart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mapeamento de range para interval. Definido fora do componente para evitar recriação a cada render.
const rangeOptions = {
  '1d': { interval: '1h', label: '1D' },
  '7d': { interval: '1d', label: '7D' },
  '1mo': { interval: '1d', label: '1M' },
  '6mo': { interval: '1wk', label: '6M' },
  '1y': { interval: '1mo', label: '1A' },
  '5y': { interval: '3mo', label: '5A' },
  'max': { interval: '3mo', label: 'Máx' },
};

const Share = () => {
  const { ticker } = useParams(); // Pega o ticker da URL, ex: "PETR4"
  const [data, setData] = useState(null);
  const [range, setRange] = useState('1mo'); // Estado para controlar o período do gráfico
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchShareData() {
      try {
        setLoading(true);
        const interval = rangeOptions[range].interval;
        const token = import.meta.env.VITE_BRAPI_TOKEN; // Usando variável de ambiente
        const url = `https://brapi.dev/api/quote/${ticker}?token=${token}&range=${range}&interval=${interval}&dividends=true&modules=financialData`;

        const response = await fetch(url);
        if (!response.ok) throw new Error(`Erro na API: ${response.status} ${response.statusText}`);

        const result = await response.json();
        // Verifica se há resultados e se o primeiro resultado é um objeto válido
        if (!result.results || result.results.length === 0 || !result.results[0]) {
          throw new Error('Ativo não encontrado ou dados indisponíveis.');
        }
        setData(result.results[0]);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchShareData();
  }, [ticker, range]); // Agora as dependências estão corretas e completas.

  // Função para formatar a data do gráfico dinamicamente
  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    switch (range) {
      case '1d':
        return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
      case '5d':
      case '1mo':
        return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
      case '6mo':
      case '1y':
        return date.toLocaleDateString('pt-BR', { month: 'short', year: '2-digit' });
      default: // 5y, max
        return date.toLocaleDateString('pt-BR', { year: 'numeric' });
    }
  };

  // Prepara os dados para o gráfico, formatando a data
  const chartData = data?.historicalDataPrice?.map(item => ({
    date: formatDate(item.date),
    Preço: parseFloat(item.close.toFixed(2)), // Garante que é um número
  }));

  return (
    <>
      <Header />
      <div className="bg-[rgb(var(--color-bg))] text-[rgb(var(--color-text))]">
        {/* Hero Section */}
        {loading && <div className="h-56 pt-16 w-full bg-[rgb(var(--color-bg-alt))] animate-pulse" />}
        {error && <p className="pt-24 text-center text-red-500">Erro ao carregar dados do ativo.</p>}
        {data && <ShareHero logo={data.logourl} longName={data.longName} symbol={data.symbol} />}

        <main className="w-full flex flex-col items-center pb-16">
          {data && (
            <div className="w-full max-w-6xl px-4">
              {/* Seção de Cotação */}
              <section id="cotacao" className="pt-12">
                <h2 className="text-2xl font-bold mb-4">Cotação</h2>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                  <IndicatorCard title="Valor da Ação" value={data.regularMarketPrice?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) || 'N/A'} />
                  <IndicatorCard title="Variação (dia)" value={`${data.regularMarketChangePercent?.toFixed(2) || 'N/A'}%`} />
                  <IndicatorCard title="P/L" value={data.priceEarnings?.toFixed(2) || data.trailingPE?.toFixed(2) || 'N/A'} />
                </div>

                {/* Navegação de Período do Gráfico */}
                <div className="flex space-x-2 mb-4">
                  {Object.keys(rangeOptions).map((key) => (
                    <button
                      key={key}
                      onClick={() => setRange(key)}
                      className={`px-3 py-1 text-sm font-semibold rounded-md transition-colors ${
                        range === key ? 'bg-indigo-600 text-white' : 'bg-[rgb(var(--color-bg-alt))] hover:bg-indigo-500/20'
                      }`}
                    >
                      {rangeOptions[key].label}
                    </button>
                  ))}
                </div>

                {chartData && (
                  <div className="h-96 w-full bg-[rgb(var(--color-bg-alt))] rounded-lg p-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={chartData}
                        margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                        <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                        <YAxis domain={['dataMin - 1', 'dataMax + 1']} tickFormatter={(value) => `R$${value.toFixed(2)}`} tick={{ fontSize: 12 }} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'rgb(var(--color-bg))',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            borderRadius: '0.5rem'
                          }}
                        />
                        <Line type="monotone" dataKey="Preço" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 8 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </section>

              {/* Seção de Indicadores */}
              <section id="indicadores" className="pt-12">
                <h2 className="text-2xl font-bold mb-4">Principais Indicadores</h2>
                <IndicatorList financialData={data.financialData} />
              </section>

              {/* Seção de Dividendos */}
              <section id="dividendos" className="pt-12">
                <h2 className="text-2xl font-bold mb-4">Histórico de Dividendos</h2>
                <DividendChart dividendsData={data.dividendsData} />
              </section>
            </div>
          )}
        </main>
      </div>
    </>
  )
}

export default Share
