"use client"

import { Card, CardHeader } from '@/components/ui/card'
import { categoryItems } from '@/data/categoryItems'
import Image from 'next/image'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'

function SelectCategory({ setEnabled, isEditing=false, defaultValue=undefined }: { 
    setEnabled?: Dispatch<SetStateAction<boolean>>,
    isEditing?: boolean,
    defaultValue?: string | undefined }) {
    const [ selectedCategory, setSelectedCategory ] =useState<string | undefined>(undefined);
    const editStyle = 'grid grid-cols-2 gap-4 mt-5 pr-5 w-full mx-auto mb-5 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 lg:gap-4 lg:w-full';
    const iconSize = 25;
    const iconStyle = 'w-5 h-5'
    const labelStyle = 'text-xs font-medium text-center';

    useEffect(() => {
        if(defaultValue) setSelectedCategory(defaultValue);
    }, []);
    
  return (
    <div className={!isEditing ? 
            'grid grid-cols-2 gap-4 mt-10 w-4/5 mx-auto mb-36 lg:grid-cols-5 lg:gap-8 lg:w-3/5' : 
            editStyle}>
        <input type='hidden' name="categoryName" value={selectedCategory as string} />
        {
            categoryItems.map(item => {
                return (
                    <div key={item.id} className='cursor-pointer'>
                        <Card 
                            className={selectedCategory === item.name ? 'border-primary border-4' : ''}
                            onClick={() => { 
                                setSelectedCategory(item.name);
                                if(setEnabled) setEnabled!(true);
                                }}>
                            <CardHeader className='flex flex-col justify-center items-center'>
                                <Image 
                                    src={item.imageUrl}
                                    alt={item.name}
                                    height={!isEditing ? 32 : iconSize} 
                                    width={!isEditing ? 32 : iconSize}
                                    className={!isEditing ? 'w-8 h-8' : iconStyle}
                                />
                                <h3 className={!isEditing ? 'text-sm font-medium' : labelStyle}>
                                    {item.title}
                                </h3>
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