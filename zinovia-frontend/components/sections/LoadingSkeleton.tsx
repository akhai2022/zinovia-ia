export const SectionSkeleton = () => (
  <div className="animate-pulse py-16 md:py-24">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="h-12 bg-neutral-border rounded w-1/3 mx-auto mb-8"></div>
      <div className="h-6 bg-neutral-border rounded w-2/3 mx-auto mb-12"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-64 bg-neutral-border rounded"></div>
        ))}
      </div>
    </div>
  </div>
);

