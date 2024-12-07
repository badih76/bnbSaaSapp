'use client'

import HomeMap from '@/app/home/[id]/HomeMap';
import { Button } from '@/components/ui/button';
import { Dialog, DialogHeader, DialogTitle, DialogContent, DialogTrigger, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCountries } from '@/data/getWorldCountries';
import { getFlagURL } from '@/lib/utilsCode';
import { Search } from 'lucide-react'
import React, { useState } from 'react'
import { Card, CardHeader } from '@/components/ui/card';
import Counter from '../Counter';
import SubmitButtons from '../SubmitButtons';

function SearchModalComponent() {
    const [ step, setStep ] = useState(1);
    const [ selectedCountry, setSelectedCountry ] = useState("OM");

    const { getAllCountries } = useCountries();

    const LocalSubmitButton = () => {
        if(step === 1) {
            return (
                <Button onClick={() => setStep(step + 1)} type='button'>
                    Next
                </Button>
            )
        } else if(step === 2) {
            return (
                <SubmitButtons />
            )
        }
    }

  return (
    <Dialog>
        <DialogTrigger asChild>
            <div className='rounded-full lg:py-2 lg:px-5 border flex items-center cursor-pointer sm:py-3 sm:px-2'>
                <div className='flex h-full divide-x lg:text-lg sm:text-xs'>
                    <p className='px-4'>Where</p>
                    <p className='px-4'>When</p>
                    <p className='px-4'>Guests</p>
                </div>
                <Search className='bg-primary text-white p-1 h-8 w-8 rounded-full' />
            </div>
        </DialogTrigger>
        <DialogContent className='sm:max-x-[425px]'>
            <form className='gap-4 flex flex-col'>
                <input type='hidden' name="country" value={selectedCountry} />
                {
                    step === 1 ? (
                        <>
                            <DialogHeader>
                                <DialogTitle>
                                    Select a Country
                                </DialogTitle>
                                <DialogDescription>
                                    Please, select the country you want to search for a home in.
                                </DialogDescription>
                            </DialogHeader>

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

                            <HomeMap locationValue={selectedCountry} zoom={5}/>
                        </>
                    ) : (
                        <>
                            <DialogHeader>
                                <DialogTitle>
                                    What are you looking for?
                                </DialogTitle>
                                <DialogDescription>
                                    Please, enter the number of bedrooms, number of bathrooms and number guests 
                                    you are looking for in a home.
                                </DialogDescription>
                            </DialogHeader>

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
                                            <Counter name="guests" />
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
                                            <Counter name="rooms" />
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
                                            <Counter name="bathrooms" />
                                        </div>
                                    </div>
                                </CardHeader>
                            </Card>
                        </>
                    )
                }

                <DialogFooter>
                    <LocalSubmitButton />
                </DialogFooter>
            </form>
        </DialogContent>
    </Dialog>
  )
}

export default SearchModalComponent