"use client"

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip";
import { categoryItems, iAppProps } from '@/data/categoryItems';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import React, { useCallback } from 'react'


function MapFilterItems() {
    const searchParams = useSearchParams();
    const search = searchParams.get("filter");
    const pathname = usePathname();

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set(name, value);
            return params.toString();
        }, [searchParams]
    );
    
  return (
    <div className='flex flex-row justify-evenly mt-5 w-full overflow-x-scroll no-scrollbar'>
        {
            categoryItems.map((item: iAppProps) => {
                return <Link key={item.id} 
                    href={
                        pathname + "?" + createQueryString('filter', item.name)
                    } 
                    className={
                        cn(search === item.name 
                            ? "border-b-2 border-black pb-2 flex-shrink-0"
                            : "opacity-70 flex-shrink-0",
                            "flex flex-col gap-y-3 items-center"
                        )
                    }
                    >
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <div className='relative lg:w-8 lg:h-8 md:w-6 md:h-6 sm:w-4 sm:h-4'>
                                        <Image src={item.imageUrl} alt="Category image"
                                            className='lg:w-8 lg:h-8 md:w-6 md:h-6 sm:w-4 sm:h-4'
                                            width={24} height={24}
                                        />
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p className='text-xs font-medium'>
                                        {item.title}
                                    </p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    
                    {/* <p className='text-xs font-medium'>
                        {item.title}
                    </p> */}
                </Link>
                })
            
        }
    </div>
  )
}

export default MapFilterItems;
