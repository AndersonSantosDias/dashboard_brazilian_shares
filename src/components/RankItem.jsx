import H3 from "./H3"
import { Link } from "react-router-dom"


const RankItem = ({marketCap, Change, logo, tiker}) => {
  const isPositive = parseFloat(Change) > 0;
  return (
    <Link to={`/share/${tiker}`} className="flex p-4 w-full justify-between items-center transition-colors hover:bg-[rgb(var(--color-bg))]">
        <div className="flex gap-2 items-center">
        <img src={logo} alt={tiker} className="w-8 h-8 rounded-full"/>
        <div>
        <p className="font-semibold text-[rgb(var(--color-text))]">{tiker}</p>
        </div>
        </div>
        <div className="text-end" >
        <H3 text={marketCap}/>
        <p className={`font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>{isPositive ? '+' : ''}{Change}%</p>
        </div>
    </Link>
  )
}

export default RankItem
