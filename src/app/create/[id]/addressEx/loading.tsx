import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

function AddressPageLoading() {
  return (
    <div className="w-3/5 mx-auto">
        <h2 className="text-3xl font-semibold tracking-tight transaction-colors">
            Where is this home located?
        </h2>
        <div className="mx-auto w-full mt-10 flex flex-col gap-y-5 pb-36 ">
            <div className="flex flex-col gap-y-2">
                <Skeleton className='w-full h-[25px] mt-5' />
            </div>
            <div className="flex flex-col gap-y-2">
                <Skeleton className='w-full h-[25px] mt-5' />
            </div>
            <div className="flex flex-col gap-y-2">
                <Skeleton className='w-full h-[50vh] mt-5' />
            </div>
            
        </div>
    </div>
  )
}

export default AddressPageLoading

