const RankItemSkeleton = () => {
  return (
    <div className="flex p-4 w-full justify-between items-center">
      <div className="flex gap-2 items-center">
        <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-slate-700" />
        <div>
          <div className="h-4 w-16 bg-gray-300 dark:bg-slate-700 rounded" />
        </div>
      </div>
      <div className="flex flex-col gap-2 items-end">
        <div className="h-4 w-20 bg-gray-300 dark:bg-slate-700 rounded" />
        <div className="h-4 w-12 bg-gray-300 dark:bg-slate-700 rounded" />
      </div>
    </div>
  );
};

export default RankItemSkeleton;