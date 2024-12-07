import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const SkeletonLoading = () => {
    return (
      <div className="grid lg:grid-cols-5 sm:grid-cols-3 md-grid-cols-3 gap-8 mt-8">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>   
    )
  }

function SkeletonCard() {
  return (
    <div className='flex flex-col space-y-3'>
        <Skeleton className='h-56 w-full rounded-lg bg-gray-100' />
        <div className="space-y-2">
            <Skeleton className="h-4 w-full  bg-gray-100" />
            <Skeleton className="h-4 w-full  bg-gray-100" />
            <Skeleton className="h-4 w-3/5  bg-gray-100" />
      </div>
    </div>
  )
}

export default SkeletonLoading;