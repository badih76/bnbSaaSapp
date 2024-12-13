"use client"

import { createLocation } from '@/app/actions/actions';
import AddressSearchInput from '@/app/my-components/AddressSearchInput';
import CreateScreenBottomBar from '@/app/my-components/CreateScreenBottomBar'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton';
import { useCountries } from '@/data/getWorldCountries'
import { getFlagURL } from '@/lib/utilsCode';
import dynamic from 'next/dynamic';
import React, { useState } from 'react'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'

const useAPI = process.env.USE_API === "1" ? true : false;

function CreateAddAddressEx({ params }: { params: { id: string }}) {
    const { getAllCountries } = useCountries();
    const [ selectedCountry, setSelectedCountry ] = useState("OM");
    const [ lon, setLon ] = useState<number | null>(-0.09);
    const [ lat, setLat ] = useState<number | null>(52.505);
    const [ zoom, setZoom ] = useState<number | null>(6);
    const [ address, setAddress ] = useState<string | null>('');

    const LazyMap = dynamic(() => import('@/app/my-components/Map'), {
        ssr: false,
        loading: () => <Skeleton className='h-[50vh] w-full' />
    })

    const setMarker = (ln: number | null, lt: number | null, z: number | null, add: string | null) => {
        setLon(ln);
        setLat(lt);
        setZoom(z);
        setAddress(add);
    }

    // const { getUser } = getKindeServerSession();
    // const user = await getUser();
    const { getUser } = useKindeBrowserClient();
    const user = getUser();

  return (
    <>
        <div className="w-3/5 mx-auto">
            <h2 className="text-3xl font-semibold tracking-tight transaction-colors">
                Where is this home located?
            </h2>
            <form action={useAPI ? "/api/createHome/addHomeLocation" : createLocation}>
                <input type="hidden" name="homeId" value={params.id} />
                <input type="hidden" name="countryValue" value={selectedCountry} />
                <input type="hidden" name="addressValue" value={address ?? ''} />

                <div className="mx-auto w-full mt-10 flex flex-col gap-y-5 mb-36 ">
                    <div className="flex flex-col gap-y-2">
                        <Select required onValueChange={(value) => 
                            {
                                setSelectedCountry(value);
                                const country = getAllCountries().find((c) => {
                                    return c.value == value;
                                })
                                setLon(country?.latLang[1]!);
                                setLat(country?.latLang[0]!);
                                setZoom(6);
                            }}>
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
                    <AddressSearchInput setMarker={setMarker} />
                    <LazyMap country={selectedCountry} lon={lon} lat={lat} zoom={zoom} />
                    
                </div>

            <CreateScreenBottomBar homeId={params.id} userId={user?.id} enabled={true} />
            </form>
        </div>
    </>
  )
}

export default CreateAddAddressEx


