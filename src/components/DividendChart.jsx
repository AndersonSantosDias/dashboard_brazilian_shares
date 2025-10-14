import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[rgb(var(--color-bg))] p-4 rounded-lg shadow-lg border border-white/20">
        <p className="font-bold">{`Ano: ${label}`}</p>
        <p className="text-indigo-400">{`Total: ${payload[0].value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`}</p>
      </div>
    );
  }
  return null;
};

const DividendChart = ({ dividendsData }) => {
  if (!dividendsData?.cashDividends?.length) {
    return (
      <div className="h-96 bg-[rgb(var(--color-bg-alt))] rounded-lg flex items-center justify-center">
        <p className="text-lg opacity-50">Histórico de dividendos não disponível.</p>
      </div>
    );
  }

  // Agrupa e soma os dividendos por ano
  const yearlyDividends = dividendsData.cashDividends.reduce((acc, dividend) => {
    if (!dividend.paymentDate) return acc;
    const year = new Date(dividend.paymentDate).getFullYear();
    acc[year] = (acc[year] || 0) + dividend.rate;
    return acc;
  }, {});

  // Formata os dados para o gráfico e ordena por ano
  const chartData = Object.keys(yearlyDividends)
    .map(year => ({
      name: year,
      'Dividendos (R$)': parseFloat(yearlyDividends[year].toFixed(2)),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="h-96 w-full bg-[rgb(var(--color-bg-alt))] rounded-lg p-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tickFormatter={(value) => `R$${value}`} tick={{ fontSize: 12 }} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(136, 132, 216, 0.2)' }} />
          <Legend />
          <Bar dataKey="Dividendos (R$)" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DividendChart;