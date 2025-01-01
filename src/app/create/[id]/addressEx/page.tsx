"use client"

import { createLocation, log } from '@/app/actions/actions';
import AddressSearchInput from '@/app/my-components/AddressSearchInput';
import CreateScreenBottomBar from '@/app/my-components/CreateScreenBottomBar'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton';
import { useCountries } from '@/data/getWorldCountries'
import { getFlagURL } from '@/lib/utilsCode';
import dynamic from 'next/dynamic';
import React, { useState } from 'react'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { redirect } from 'next/navigation';
import { ELogLevel, ILogObject } from '@/loggerServices/loggerInterfaces';
import AddressPageLoading from './loading';

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

    const { isAuthenticated, user, isLoading
        // , getToken 
    } = useKindeBrowserClient();

    try {
        if(!isLoading) {
            if(isAuthenticated) {
                return (
                    <>
                        <div className="w-full mx-auto">
                            <form action={useAPI ? "/api/createHome/addHomeLocation" : createLocation}>
                                <input type="hidden" name="homeId" value={params.id} />
                                <input type="hidden" name="countryValue" value={selectedCountry} />
                                <input type="hidden" name="addressValue" value={address ?? ''} />

                                <div className="w-3/5 mx-auto">
                                    <h2 className="text-3xl font-semibold tracking-tight transaction-colors">
                                        Where is this home located?
                                    </h2>
                                    <div className="mx-auto w-full mt-10 flex flex-col gap-y-5 pb-36 ">
                                        <div className="flex flex-col gap-y-2">
                                            <Select required onValueChange={(value) => 
                                                {
                                                    setSelectedCountry(value);
                                                    const country = getAllCountries().find((c) => {
                                                        return c.value == value;
                                                    })
                                                    setLon(country ? country.latLang[1] : -0.09);
                                                    setLat(country ? country.latLang[0] : 52.505);
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
                                </div>
                            <CreateScreenBottomBar homeId={params.id} userId={user?.id} enabled={true} />
                            </form>
                        </div>
                    </>
                )
            } else {
                if(!user || !user.id) return redirect("/api/auth/login?");

            }
        } else {
            return (
                <>
                    <AddressPageLoading />
                </>
            )

        }

    } catch(ex) {
        const logObj: ILogObject = {
        level: ELogLevel.Error,
        message: `Error: ${(ex as Error).message}`,
        metaData: {
            service: "ESM-bnb-14",
            module: "New Home Listing Creation - addressEx",
            category: "Home Listing",
            stackdump: (ex as Error).stack,
        },
        };
        log(logObj);
    }

}

export default CreateAddAddressEx


