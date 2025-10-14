
export function formatMarketCap(value) {
  if (value === null || value === undefined) return "N/A";
  return value.toLocaleString('pt-BR', {
    notation: 'compact',
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 2
  });
}

export function formatPercent(value) {
  if (value === undefined || value === null) return "N/A"
  return `${value.toFixed(2)}%`
}
