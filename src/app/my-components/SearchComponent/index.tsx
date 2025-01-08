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
import { DateRange } from 'react-date-range';

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file


function SearchModalComponent() {
    const [ step, setStep ] = useState(1);
    const [ selectedCountry, setSelectedCountry ] = useState("OM");
    const [ state1, setState1 ] = useState([{
        startDate: new Date(),
        endDate: new Date(),
        key: "selection"
    }]);

    const { getAllCountries } = useCountries();

    const LocalSubmitButton = () => {
        if(step === 1 || step === 2) {
            return (
                <Button onClick={() => setStep(step + 1)} type='button'>
                    Next
                </Button>
            )
        } else if(step === 3) {
            return (
                <SubmitButtons enabled={true}  />
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
            <form className='gap-4 flex flex-col' action={"/"}>
                <input type='hidden' name="country" value={selectedCountry} />
                <input type='hidden' name='startDate' value={state1[0].startDate.toISOString()} />
                <input type='hidden' name='endDate' value={state1[0].endDate.toISOString()} />
                {
                    step === 1 ? (
                        <>
                            <DialogHeader>
                                <DialogTitle className='text-primary'>
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
                    ) : step === 2 ? (
                        <>
                            <DialogHeader>
                                <DialogTitle className='text-primary w-full'>
                                    Select dates
                                </DialogTitle>
                                <DialogDescription>
                                    Please, select the dates you want to reserv.
                                </DialogDescription>
                            </DialogHeader>
                            <DateRange date={ new Date()}
                                showDateDisplay={false}
                                rangeColors={["#FF5A5F"]}
                                ranges={state1}
                                onChange={(item) => setState1([item.selection as any])}
                                minDate={new Date()}
                                direction="vertical"
                                // disabledDates={disabledDates}
                            />
                        </>
                    ) : (
                        // step 3
                        <>
                            <DialogHeader>
                                <DialogTitle className='text-primary'>
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