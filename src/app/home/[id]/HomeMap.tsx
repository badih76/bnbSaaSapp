'use client'

import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';
import { useEffect, useState } from 'react';
import { SearchAddress } from '@/lib/utilsCode';
import { IAddress } from '@/lib/interfaces';

const HomeMap = ({ locationValue, zoom, defaultValue }: { locationValue: string, zoom?: number, defaultValue?: string | null }) => {
    const [ foundAddresses, setFoundAddresses ] = useState<IAddress[]>([]);
    const [ lon, setLon ] = useState<number | null>(null);
    const [ lat, setLat ] = useState<number | null>(null);

    // get the lat & long of the address
    useEffect(()=> {
        // console.log("Default value: ", defaultValue);
        if(defaultValue) {
            // console.log("Look for the address: ", defaultValue);
            // find the address and get coordinates
            SearchAddress(defaultValue, setFoundAddresses);
        }
    }, []);

    useEffect(() => {
        let foundAddress: IAddress | undefined;
        
        if(defaultValue) {
            foundAddress = foundAddresses.find(a => a.value == defaultValue.trim());
        
        console.log(foundAddress);

        if(foundAddress) {
            setLon(foundAddress.lon);
            setLat(foundAddress.lat);
        }
        else 
            if(foundAddresses.length === 1) {
                console.log(foundAddresses[0]);
                setLon(foundAddresses[0].lon);
                setLat(foundAddresses[0].lat);
            }
        }
    }, [ foundAddresses ]);


    const LazyMap = dynamic( () => import('@/app/my-components/Map'),
    {
        ssr: false,
        loading: () => <Skeleton className="h-[50vh] w-full" />
    });

    return <LazyMap country={locationValue as string} 
        lon={lon} lat={lat} zoom={zoom ?? 8}  />
}

export default HomeMap;