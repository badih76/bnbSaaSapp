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
import { SearchAddress } from '@/lib/utilsCode';
import { IAddress } from '@/lib/interfaces';

interface IParams {
    setMarker: (lon: number, lat: number, z: number | null, add: string) => void,
    defaultValue?: string | undefined
}

const AddressSearchInput = ({ setMarker, defaultValue } : IParams) => {
    const [ address, setAddress ] = useState('');
    const [ pending, setPending ] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [ foundAddresses, setFoundAddresses ] = useState<IAddress[]>([]);
    const [ timer, setTimer ] = useState<NodeJS.Timeout>();

    useEffect(()=> {
        // console.log("Default value: ", defaultValue);
        if(defaultValue) {
            setAddress(defaultValue);

            // console.log("Look for the address: ", defaultValue);
            // find the address and get coordinates
            SearchAddress(defaultValue, setFoundAddresses);
        }
    }, []);

    useEffect(() => {
        let foundAddress: IAddress | undefined;

        if(defaultValue) {
            foundAddress = foundAddresses.find(a => a.value == defaultValue.trim());
            
        if(foundAddress) 
            setMarker(foundAddress.lon, foundAddress.lat, 15, foundAddress.label);
        else 
            if(foundAddresses.length === 1) setMarker(foundAddresses[0].lon, foundAddresses[0].lat, 15, foundAddresses[0].label);

        }
    }, [ foundAddresses ]);
  
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
                        ? defaultValue ? address : foundAddresses.find((a) => a.value === address)?.label
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
                        <CommandInput placeholder="Search addresses..." className='w-full' name='address'
                        onValueChange={(value) => {
                                const searchValue = value;

                                setPending(true);
                                clearTimeout(timer)

                                const newTimer = setTimeout(() => {
                                    // call Api to check the name
                                    SearchAddress(searchValue, setFoundAddresses);

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