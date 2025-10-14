export default function Logo() {
  return (
    <div className="flex items-center gap-2 font-bold text-xl text-[rgb(var(--color-primary))] select-none">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 16l5-5 4 4 7-7"
        />
      </svg>
      <span>FinScope</span>
    </div>
  );
}
