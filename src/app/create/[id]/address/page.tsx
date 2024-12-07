"use client"

import { createLocation } from '@/app/actions/actions';
import CreateScreenBottomBar from '@/app/my-components/CreateScreenBottomBar'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton';
import { useCountries } from '@/data/getWorldCountries'
import dynamic from 'next/dynamic';
import React, { useState } from 'react'

const getFlagURL = ((countryCode: string) => {
    const cc: string = countryCode;
    return `https://flagcdn.com/20x15/${cc.toLowerCase()}.png`
});

function CreateAddAddress({ params }: { params: { id: string }}) {
    const { getAllCountries } = useCountries();
    const [ selectedCountry, setSelectedCountry ] = useState("OM");

    const LazyMap = dynamic(() => import('@/app/my-components/Map'), {
        ssr: false,
        loading: () => <Skeleton className='h-[50vh] w-full' />
    })

  return (
    <>
        <div className="w-3/5 mx-auto">
            <h2 className="text-3xl font-semibold tracking-tight transaction-colors">
                Where is this home located?
            </h2>
            <form action={createLocation}>
                <input type="hidden" name="homeId" value={params.id} />
                <input type="hidden" name="countryValue" value={selectedCountry} />
                <div className="mx-auto w-full mt-10 flex flex-col gap-y-5 mb-36 ">
                    <div className="flex flex-col gap-y-2">
                        <Select required onValueChange={(value) => setSelectedCountry(value)}>
                            <SelectTrigger className='w-full'>
                                <SelectValue placeholder='Select a country' />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Countries</SelectLabel>
                                    { getAllCountries().map(item => {
                                        return (
                                        <SelectItem key={item.value} value={item.value}>
                                            <div className='w-full flex flex-row gap-5'>
                                                <img  
                                                    src={getFlagURL(item.value)}
                                                    width="20"  
                                                    height="8"  
                                                    alt={item.label} /> 
                                                { item.label + " / " + item.region }
                                            </div>
                                        </SelectItem>)
                                        })
                                    }
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <LazyMap country={selectedCountry} lat={null} lon={null} zoom={null} />
                    
                </div>

            <CreateScreenBottomBar />
            </form>
        </div>
    </>
  )
}

export default CreateAddAddress