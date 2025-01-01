import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

function DescriptionPageLoading() {
  return (
    <div className="w-3/5 mx-auto">
        <h2 className="text-xl font-semibold text-primary tracking-tight transaction-colors lg:text-3xl">
            Please, describe your home as good as you can
        </h2>
        
        <div className="mx-auto w-full mt-10 flex flex-col gap-y-5 pb-36 ">
            <div className="flex flex-col gap-y-2">
                <Skeleton className='w-full h-[20px] mt-5' />
            </div>
            <div className="flex flex-col gap-y-2">
                <Skeleton className='w-full h-[20px] mt-5' />
            </div>
            <div className="flex flex-col gap-y-2">
                <Skeleton className='w-full h-[20px] mt-5' />   
            </div>
            <div className="flex flex-col gap-y-2">
                <Skeleton className='w-full h-[20x] mt-5' />
            </div>
            <div className="flex flex-col gap-y-2">
                <Skeleton className='w-full h-[20px] mt-5' />
            </div>
            <div className="flex flex-col gap-y-2">
                <Skeleton className='w-full h-[20px] mt-5' />
            </div>
            <div className="flex flex-col gap-y-2">
                <Skeleton className='w-full h-[20px] mt-5' />
            </div>
            <div className="flex flex-col gap-y-2">
                <Skeleton className='w-full h-[20px] mt-5' />
            </div>
            <div className="flex flex-col gap-y-2">
                <Skeleton className='w-full h-[20px] mt-5' />
            </div>
        </div>
    </div>
  )
}

export default DescriptionPageLoading

