import { formatMarketCap, formatPercent } from "../utils/Formats";
import IndicatorCard from "./IndicatorCard";

const IndicatorList = ({ financialData }) => {
  if (!financialData) {
    return <p className="text-lg opacity-50 text-center py-4">Dados financeiros não disponíveis para este período.</p>;
  }

  const indicators = [
    { label: "EBITDA", value: formatMarketCap(financialData.ebitda) },
    { label: "Dívida/Patrimônio", value: financialData.debtToEquity?.toFixed(2) || 'N/A' },
    { label: "ROE (Retorno s/ Patrimônio)", value: formatPercent(financialData.returnOnEquity * 100) },
    { label: "Margem Líquida", value: formatPercent(financialData.profitMargins * 100) },
    { label: "Crescimento dos Lucros (anual)", value: formatPercent(financialData.earningsGrowth * 100) },
    { label: "Receita por Ação", value: financialData.revenuePerShare?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) || 'N/A' },
    { label: "Liquidez Corrente", value: financialData.currentRatio?.toFixed(2) || 'N/A' },
    { label: "Liquidez Seca", value: financialData.quickRatio?.toFixed(2) || 'N/A' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {indicators.map((indicator, index) => (
        <IndicatorCard
          key={index}
          title={indicator.label}
          value={indicator.value}
        />
      ))}
    </div>
  );
};

export default IndicatorList;