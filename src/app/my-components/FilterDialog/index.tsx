'use client'

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { SlidersHorizontal } from 'lucide-react';
import React, { useState } from 'react'

import { Slider } from "@nextui-org/slider"
import { Card, CardHeader } from '@/components/ui/card';
import Counter from '../Counter';
import SelectFacilities from '@/app/create/[id]/description/facilities';
import { Button } from '@/components/ui/button';
import { useSearchParams } from 'next/navigation';
// import Link from 'next/link';
// import { IFilters } from '@/lib/interfaces';


  

function FilterDialog() {
    const searchParams = useSearchParams();
    // const pathname = usePathname();
    
    // const createQueryString = useCallback(
    //         (filtersObj: IFilters) => {
    //             const params = new URLSearchParams(searchParams.toString());

    //             Object.entries(filtersObj).forEach(val => {
    //                 console.log(val[0], '-> ', val[1]);
    //                 params.set(val[0], val[1]);

    //             })

    //             return params.toString();
    //         }, [searchParams]
    //     );
        
    const [ priceRange, setPriceRange ] = useState<number | number[]>([0, 500]);

  return (
    <Dialog>
        <DialogTrigger asChild>
            <SlidersHorizontal size={30} 
                className='cursor-pointer'
            />
        </DialogTrigger>
        <DialogContent className={cn('max-w-[60vw]')}>
            <form action="/">
                <input type='hidden' name='priceMin' value={(priceRange as number[])[0]} />
                <input type='hidden' name='priceMax' value={(priceRange as number[])[1]} />
            <DialogHeader>
                <DialogTitle className='text-primary font-medium mb-5'>
                    <h1 className='text-lg font-bold text-primary pb-3'>Edit Filters</h1>
                </DialogTitle>
                <DialogDescription className='flex flex-col gap-2 w-full overflow-y-scroll max-h-[65vh]'>
                    <div className='mr-5'>
                        <Separator />
                        <div className='mb-5'>
                            <div className='text-primary text-lg font-medium mt-5 mb-5'>
                                <div>Price</div>
                            </div>
                            <div className='w-full'>
                                <Slider
                                    className="w-full"
                                    formatOptions={{style: "currency", currency: "AUD"}}
                                    label="Select a budget"
                                    maxValue={1000}
                                    minValue={0}
                                    step={10}
                                    // value={priceRange}
                                    value={priceRange}
                                    onChange={(e) => {
                                        setPriceRange(e);
                                        
                                    }}
                                    classNames={{
                                        thumb: [
                                            'w-5 h-5',
                                            "bg-gradient-to-r from-default-200 to-default-500",
                                            // "data-[dragging=true]:shadow-lg data-[dragging=true]:shadow-black/20",
                                            "data-[dragging=true]:w-7 data-[dragging=true]:h-7 data-[dragging=true]:after:h-6 data-[dragging=true]:after:w-6",
                                        ]
                                    }}          
                                />
                            </div>
                        </div>
                        <div className='mb-5'> 
                            <Card>
                                <CardHeader 
                                    className="flex flex-col gap-y-5">
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <h3 className="underline font-medium">
                                                Guests:</h3>
                                            <p
                                                className="text-muted-forground text-sm">
                                                How many guests for this property?</p>
                                        </div>
                                        <div>
                                            <Counter name="guests" defaultValue={searchParams.get('guests') !== null ? parseInt(searchParams.get('guests')!) : 0} />
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <h3 className="underline font-medium">
                                                Rooms:</h3>
                                            <p
                                                className="text-muted-forground text-sm">
                                                How many rooms in this property?</p>
                                        </div>
                                        <div>
                                            <Counter name="rooms" defaultValue={searchParams.get('rooms') !== null ? parseInt(searchParams.get('rooms')!) : 0} />
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <h3 className="underline font-medium">
                                                Bathrooms:</h3>
                                            <p
                                                className="text-muted-forground text-sm">
                                                How many bathrooms in this property?</p>
                                        </div>
                                        <div>
                                            <Counter name="bathrooms" defaultValue={searchParams.get('bathrooms') !== null ? parseInt(searchParams.get('bathrooms')!) : 0} />
                                        </div>
                                    </div>
                                </CardHeader>
                            </Card>
                        </div>
                        <Separator className='mb-5' />
                        <div>
                            <SelectFacilities defaultValue={searchParams.get('facilities') !== null ? searchParams.get('facilities')! : undefined} />
                        </div>
                    </div>
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <LocalSubmitButton />
            </DialogFooter>
        </form>
        </DialogContent>
    </Dialog>
  )
}

export default FilterDialog;

const LocalSubmitButton = () => {
    return (
        <div className='rounded-lg w-full flex flex-row justify-between bg-white p-5'>
            <div>
                <Button variant="destructive" onClick={(e) => {
                    e.preventDefault();
                }}>
                    <DialogClose>
                        Cancel
                    </DialogClose>
                </Button>
            </div>
            <div>
                {/* <Link className={buttonVariants({ variant: "default" })} 
                    href={
                        pathname + "?" + queryString
                    }>
                    Submit
                </Link> */}
                <Button variant="default" type='submit'>Submit</Button>
            </div>
        </div>
    )
}