import { Label } from '@/components/ui/label';
import React, { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react';

import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from '@/lib/utils';

interface IAddress {
    value: string,
    label: string,
    lon: number,
    lat: number,
}

interface IParams {
    setMarker: (lon: number, lat: number, z: number | null, add: string) => void
}

const AddressSearchInput = ({ setMarker } : IParams) => {
    const [ address, setAddress ] = useState('');
    const [ pending, setPending ] = useState(false);

    const [open, setOpen] = React.useState(false);
    const [ foundAddresses, setFoundAddresses ] = useState<IAddress[]>([]);

    const [ timer, setTimer ] = useState<NodeJS.Timeout>();

    useEffect(() => {
        console.log('Address changed', address);
    }, [address]);

    
    useEffect(() => {
        console.log('Addresses found:', foundAddresses);
    }, [foundAddresses]);


    const SearchAddress = (address: string, country: string | null=null) => {
        console.log(address);
        const apiKey = process.env.GEOAPIFY_API_KEY!;
        console.log(apiKey);
        const url = `https://api.geoapify.com/v1/geocode/search?text=${address}${country !== null ? '&country='+country : ''}&limit=50&format=json&apiKey=${apiKey}`;
        console.log('URL: ', url);

        try {
            fetch(url,
                {
                  method: 'get',
                  cache: "no-cache" 
                })
                .then(res => {
                    return res.json();
    
                })
                .then(json => {
                    // console.log(json);
                    const foundAddresses: IAddress[] = [];

                    json.results.map((r: any) => {
                        console.log(r.formatted);
                        foundAddresses.push({ value: r.formatted, label: r.formatted, lon: parseFloat(r.lon), lat: parseFloat(r.lat) });
                    })
                    
                    setFoundAddresses(foundAddresses);
                    return json
                    
                })
                .catch (err => {
                    console.log("Error: ", (err as any).message);
                    return false;
                });
        } catch(err) {
            console.log("Error: ", (err as any).message);
            return false;
        }

        setPending(false);
    }
  
    return (
        <div className="flex flex-col gap-y-2">
            <Label>Enter the home address</Label>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild className='w-full'>
                    <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                    >
                    {address != ''
                        ? foundAddresses.find((a) => a.value === address)?.label
                        : "Search for the address..."}
                    {/* <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" /> */}
                    {
                        pending ? 
                        <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                        : ''
                    }
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                    <Command shouldFilter={false} className='w-full'>
                        <CommandInput placeholder="Search addresses..." className='w-full' onValueChange={
                            (value) => {
                                const searchValue = value;

                                setPending(true);
                                clearTimeout(timer)

                                const newTimer = setTimeout(() => {
                                    // call Api to check the name
                                    SearchAddress(searchValue);

                                }, 1000);

                                setTimer(newTimer)

                            }}
                        />
                        <CommandList className={cn('w-full')}>
                            <CommandEmpty>No address found.</CommandEmpty>
                            <CommandGroup>
                            {foundAddresses.map((a) => (
                                <CommandItem
                                key={a.value}
                                value={a.value}
                                onSelect={(currentValue) => {
                                    setAddress(currentValue);
                                    setMarker(a.lon, a.lat, 15, a.label);
                                    setOpen(false)
                                }}
                                className='w-full'
                                >
                                <Check
                                    className={cn(
                                    "mr-2 h-4 w-4",
                                    address === a.value ? "opacity-100" : "opacity-0"
                                    )}
                                />
                                {a.label}
                                </CommandItem>
                            ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
                </Popover>
        </div>
    )
}

export default AddressSearchInput;