'use client';

import { cn } from '@/lib/cn';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'bg-gray-200 dark:bg-gray-700 rounded animate-pulse',
        className
      )}
    />
  );
}

export function ConversationCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-start gap-4">
        <Skeleton className="h-10 w-10 rounded-full flex-shrink-0" />
        <div className="flex-1 space-y-3">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
    </div>
  );
}

export function AgentCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-start justify-between mb-4">
        <Skeleton className="h-12 w-12 rounded-xl" />
        <Skeleton className="h-4 w-16" />
      </div>
      <Skeleton className="h-5 w-2/3 mb-2" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-4/5 mb-4" />
      <div className="flex gap-2 mb-4">
        <Skeleton className="h-6 w-16 rounded-md" />
        <Skeleton className="h-6 w-20 rounded-md" />
        <Skeleton className="h-6 w-14 rounded-md" />
      </div>
      <div className="flex justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-12" />
      </div>
    </div>
  );
}

export function TableRowSkeleton() {
  return (
    <tr className="border-b border-gray-200 dark:border-gray-700">
      <td className="px-6 py-4">
        <Skeleton className="h-4 w-32" />
      </td>
      <td className="px-6 py-4">
        <Skeleton className="h-4 w-24" />
      </td>
      <td className="px-6 py-4">
        <Skeleton className="h-4 w-28" />
      </td>
      <td className="px-6 py-4">
        <Skeleton className="h-4 w-20" />
      </td>
      <td className="px-6 py-4">
        <Skeleton className="h-4 w-16" />
      </td>
    </tr>
  );
}

export function MessageSkeleton() {
  return (
    <div className="flex gap-4">
      <Skeleton className="h-8 w-8 rounded-full flex-shrink-0" />
      <div className="flex-1 space-y-2 max-w-[70%]">
        <Skeleton className="h-20 w-full rounded-2xl" />
        <Skeleton className="h-3 w-16" />
      </div>
    </div>
  );
}

export function StatCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-lg" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
    </div>
  );
}
