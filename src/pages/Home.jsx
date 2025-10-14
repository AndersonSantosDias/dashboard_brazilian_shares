import CardRank from "../components/CardRank"
import H1 from "../components/H1"
import Header from "../components/Header"
import CardRankSkeleton from "../components/CardRankSkeleton"
import { useState, useEffect } from "react"



const Home = () => {
 const [data, setData] = useState([])
const [loading, setLoading] = useState(true)
const [error, setError] = useState(null)

useEffect(() => {
  async function fetchData() {

    try {
      const response = await fetch('https://brapi.dev/api/quote/PETR4,MGLU3,VALE3,ITUB4')
      if (!response.ok) throw new Error('Não foi possível obter os dados da API')
      const result = await response.json()
      setData(result.results)
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
          <CardRank title={"Maior valor de mercado"} data={[...data].sort((a, b) => b.marketCap - a.marketCap)}/>
          <CardRank title={"Maior alta percentual"} data={[...data].sort((a, b) => b.regularMarketChangePercent - a.regularMarketChangePercent)}/>
          <CardRank title={"Maior queda percentual"} data={[...data].sort((a, b) => a.regularMarketChangePercent - b.regularMarketChangePercent)}/>
        </section>
      )}
    </main>
    </>
  )
}

export default Home
