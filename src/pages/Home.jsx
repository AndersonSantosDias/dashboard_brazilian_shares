import CardRank from "../components/CardRank"
import H1 from "../components/H1"
import Header from "../components/Header"
import CardRankSkeleton from "../components/CardRankSkeleton"
import { useState, useEffect } from "react";


const Home = () => {
 const [marketCapRank, setMarketCapRank] = useState([]);
 const [topGainersRank, setTopGainersRank] = useState([]);
 const [topLosersRank, setTopLosersRank] = useState([]);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);

useEffect(() => {
  async function fetchData() {
    
    // Pega o token da API das variáveis de ambiente do Vite
    const token = import.meta.env.VITE_API_KEY;
    // Monta a URL com os parâmetros desejados. sortBy=marketCap já traz os dados ordenados.
    const url = `https://brapi.dev/api/quote/list?search&sortBy=market_cap_basic&sortOrder=desc&type=stock&token=${token}`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Não foi possível obter os dados da API')
      const result = await response.json()
      const rawStocks = result.stocks || [];

      // 1. Filtra tickers com mais de 5 caracteres (ex: PETR4F)
      // 2. Remove empresas duplicadas, mantendo a de maior valor de mercado (a primeira que aparece)
      const uniqueStocks = [];
      const seenCompanies = new Set();

      for (const stock of rawStocks) {
        if (stock.stock.length <= 5) {
          const companyRoot = stock.stock.slice(0, 4);
          if (!seenCompanies.has(companyRoot)) {
            uniqueStocks.push(stock);
            seenCompanies.add(companyRoot);
          }
        }
      }

      setMarketCapRank(uniqueStocks.slice(0, 5));
      // Cria uma cópia e ordena por maior variação (alta)
      setTopGainersRank([...uniqueStocks].sort((a, b) => b.change - a.change).slice(0, 5));
      // Cria uma cópia e ordena por menor variação (queda)
      setTopLosersRank([...uniqueStocks].sort((a, b) => a.change - b.change).slice(0, 5));
    } catch (e) {
      console.error(e)
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }
  fetchData()
}, [])

  return (
    <>
    <Header/>
    <main className="min-h-screen w-full flex flex-col items-center bg-[rgb(var(--color-bg))] text-[rgb(var(--color-text))] pt-16">
      <section className="text-start w-full max-w-6xl pt-8 px-4">
        <H1 text={'Rankings de Ativos'}/>
      </section>
      
      {loading && (
        <section className="flex flex-wrap justify-center items-start w-full max-w-6xl mt-10 gap-6 px-4">
          <CardRankSkeleton />
          <CardRankSkeleton />
          <CardRankSkeleton />
        </section>
      )}

      {error && (
        <div className="flex justify-center items-center h-64 bg-red-500/10 text-red-500 p-4 rounded-lg">
          <p className="text-xl font-medium">Erro: {error}</p>
        </div>
      )}

      {!loading && !error &&(
        <section className="flex flex-wrap justify-center items-start w-full max-w-6xl mt-10 gap-6 px-4">
          <CardRank title={"Maior valor de mercado"} data={marketCapRank}/>
          <CardRank title={"Maiores altas (24h)"} data={topGainersRank}/>
          <CardRank title={"Maiores quedas (24h)"} data={topLosersRank}/>
        </section>
      )}
    </main>
    </>
  )
}

export default Home
