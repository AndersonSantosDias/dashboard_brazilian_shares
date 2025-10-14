import RankItemSkeleton from "./RankItemSkeleton";

const CardRankSkeleton = () => {
  return (
    <div className="w-[350px] bg-[rgb(var(--color-bg-alt))] rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="h-[60px] w-full p-4 flex justify-center items-center border-b border-[rgb(var(--color-bg))]">
        <div className="h-6 w-48 bg-gray-300 dark:bg-slate-700 rounded" />
      </div>
      <div className="flex-grow">
        {[...Array(3)].map((_, index) => (
          <RankItemSkeleton key={index} />
        ))}
      </div>
      <div className="p-4 mt-auto">
        <div className="h-10 w-full bg-gray-300 dark:bg-slate-700 rounded-md" />
      </div>
    </div>
  );
};

export default CardRankSkeleton;