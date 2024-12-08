"use client"

import { Card, CardHeader } from '@/components/ui/card'
import { categoryItems } from '@/data/categoryItems'
import Image from 'next/image'
import React, { useState } from 'react'

function SelectCategory() {
    const [ selectedCategory, setSelectedCategory ] =useState<string | undefined>(undefined);

  return (
    <div className='grid grid-cols-2 gap-4 mt-10 w-4/5 mx-auto mb-36 lg:grid-cols-5 lg:gap-8 lg:w-3/5'>
        <input type='hidden' name="categoryName" value={selectedCategory as string} />
        {
            categoryItems.map(item => {
                return (
                    <div key={item.id} className='cursor-pointer'>
                        <Card 
                            className={selectedCategory === item.name ? 'border-primary' : ''}
                            onClick={() => setSelectedCategory(item.name)}>
                            <CardHeader className='flex flex-col items-center'>
                                <Image 
                                    src={item.imageUrl}
                                    alt={item.name}
                                    height={32} width={32}
                                    className='w-8 h-8'
                                />
                                <h3 className='text-sm font-medium'>{item.name}</h3>
                            </CardHeader>
                        </Card>
                    </div>
                )
            })
        }
    </div>
  )
}

export default SelectCategory