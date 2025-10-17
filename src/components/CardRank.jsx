import Button from "./Button"
import H2 from "./H2"
import RankItem from "./RankItem"
import { Link } from "react-router-dom"
import { formatMarketCap, formatPercent } from "../utils/Formats"




const CardRank = ({title, data}) => {
  return (
    <div className="w-[350px] bg-[rgb(var(--color-bg-alt))] rounded-lg shadow-md overflow-hidden flex flex-col">
      <div className="h-[60px] w-full p-4 flex justify-center items-center border-b border-[rgb(var(--color-bg))]">
        <H2 text={title} />
      </div>
      <div className="flex-grow">
        {
          data.map((item) => ( 
            <Link to={`/share/${item.stock}`} key={item.stock}>
              <RankItem 
                logo={item.logo} 
                tiker={item.stock} 
                longName={item.name}
                marketCap={formatMarketCap(item.market_cap)} 
                Change={formatPercent(item.change)}
              />
            </Link>
          ))
        }
      </div>
    </div>
  )
}

export default CardRank
