import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

function MyHomesLoading() {
  return (
    <div className='grid grid-flow-row grid-cols-3 gap-2
        border-2 rounded-lg border-gray-300 
        p-3 mt-5 min-h-[10vh]'>

        <div className='border border-gray-300 rounded-lg w-auto p-2 min-h-[10vh]'>
          <Skeleton className='border border-gray-300 rounded-lg w-auto p-2 min-h-[10vh]' />
        </div>
        
        <div className='border border-gray-300 rounded-lg w-auto p-2 min-h-[10vh]'>
          <Skeleton className='border border-gray-300 rounded-lg w-auto p-2 min-h-[10vh]' />
        </div>

        <Skeleton className='border border-gray-300 rounded-lg w-auto p-2 min-h-[10vh]' />
    </div>
  )
}

export default MyHomesLoading