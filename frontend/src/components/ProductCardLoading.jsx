export function ProductCardLoading({ className }) {
  return (
    <div
      className={`${className} flex flex-col gap-1 rounded-[5px]
                  animate-pulse select-none`}
    >
      {/* Product Image (skeleton) */}
      <div className="h-[260px] border-[0.5px] border-accent bg-secondary/40 aspect-[3/4] rounded-[5px] overflow-hidden">
        <div className="w-full h-full bg-secondary animate-pulse" />
      </div>

      {/* Product Information (skeleton) */}
      <div className="flex flex-col gap-2 px-1">
        <div className="space-y-2">
          <div className="h-4 w-3/4 bg-secondary/60 rounded" />
          <div className="h-3 w-1/2 bg-secondary/40 rounded" />
        </div>
        <div className="h-5 w-1/3 bg-accent/60 rounded" />
      </div>
    </div>
  );
}

export default function ProductCardLoadingList({ count = 6, className }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardLoading key={i} className={className} />
      ))}
    </>
  );
}