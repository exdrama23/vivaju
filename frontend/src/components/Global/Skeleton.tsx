import { cn } from '@/utils/utils';

export function Skeleton({ className }: { className?: string }) {
  return (
    <div className={cn("animate-pulse rounded-md bg-gray-200/60", className)} />
  );
}

export function StoreCardSkeleton() {
  return (
    <div className="flex items-center gap-6 p-4 bg-white rounded-xl w-full border border-gray-100">
      <Skeleton className="w-24 h-24 rounded-full shrink-0" />
      <div className="flex flex-col gap-2 flex-1 overflow-hidden">
        <Skeleton className="h-6 w-3/4 rounded-lg" />
        <Skeleton className="h-4 w-1/2 rounded-md" />
        <Skeleton className="h-4 w-1/3 rounded-md" />
      </div>
    </div>
  );
}

export function EventSkeleton() {
  return (
    <div className="mx-4 rounded-[32px] overflow-hidden relative min-h-[320px] bg-gray-100 animate-pulse flex flex-col justify-end p-7 sm:p-10 gap-3">
      <Skeleton className="h-4 w-20 rounded-full" />
      <Skeleton className="h-8 w-3/4 rounded-lg" />
      <Skeleton className="h-4 w-full rounded-md" />
      <div className="flex gap-2 mt-2">
        <Skeleton className="h-8 w-24 rounded-xl" />
        <Skeleton className="h-8 w-24 rounded-xl" />
      </div>
    </div>
  );
}

export function CategorySkeleton() {
  return (
    <div className="flex flex-col items-center gap-2 w-24">
      <Skeleton className="w-16 h-16 rounded-full" />
      <Skeleton className="h-3 w-16 rounded-md" />
    </div>
  );
}
