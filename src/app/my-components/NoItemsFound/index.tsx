import { File } from 'lucide-react'
import React from 'react'

interface iParams {
  title: string,
  description: string
}

function NoItemsFound() {
  return (
    <div className='flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50 mt-10'>
        <div className='flex h-20 w-20 items-center justify-center rounded-full bg-primary/10'>
            <File className='h-10 w-10 text-primary' />
        </div>
        <div>
            <h2 className='mt-6 text-xl font-semibold'>No Items Found</h2>
        </div>
    </div>
  )
}

export default NoItemsFound