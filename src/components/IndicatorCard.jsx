const IndicatorCard = ({ title, value }) => {
  return (
    <div className={`bg-[rgb(var(--color-bg))] p-4 rounded-lg border border-gray-500 shadow-sm ${title === 'Valor da Ação' ? 'col-span-2' : 'col-span-1'} md:col-span-1`}>
      <h3 className="text-sm text-[rgb(var(--color-text))] opacity-70">{title}</h3>
      <p className="text-2xl font-bold text-[rgb(var(--color-text))]">{value}</p>
    </div>
  );
};

export default IndicatorCard;