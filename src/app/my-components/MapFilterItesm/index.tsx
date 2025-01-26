"use client"

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip";
import { categoryItems, iAppProps } from '@/data/categoryItems';
import { cn } from '@/lib/utils';
// import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import React, { useCallback } from 'react'
import FilterDialog from "../FilterDialog";


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
    <div className='flex flex-row justify-between gap-2 mt-5 w-full overflow-x-scroll no-scrollbar'>
        <div className="flex flex-row justify-evenly items-center w-full overflow-x-scroll no-scrollbar">

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
                                        <div className='relative lg:w-12 lg:h-12 md:w-6 md:h-6 sm:w-4 sm:h-4'>
                                            <div style={item.imgStyle} className="bg-golden-icon lg:w-10 lg:h-10 md:w-6 md:h-6 sm:w-4 sm:h-4" />
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p className='text-xs font-medium'>
                                            {item.title}
                                        </p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                    
                        </Link>
                    })
                
            }
        </div>
        <div className="flex justify-center items-center border-l pl-3 text-primary">     
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>        
                        <FilterDialog />
                    </TooltipTrigger>
                    <TooltipContent>
                        <p className='text-xs font-medium'>
                            {"Filters"}
                        </p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            
        </div>
    </div>
  )
}

export default MapFilterItems;
