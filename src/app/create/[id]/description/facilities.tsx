'use client'

import GetFacilityIconById, { FacilityTooltip } from '@/app/my-components/getFacilityIcon';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import React, { useEffect, useState } from 'react'

function SelectFacilities({ defaultValue }: {
    defaultValue?: string | undefined
} ) {
    const [ selectedFacilities, setSelectedFacilities ] = useState<number[]>([]);

    useEffect(() => {
        let facilities: number[] = [];

        if(defaultValue) 
            facilities = JSON.parse(defaultValue);
        else 
            FacilityTooltip.forEach( () => {
                facilities.push(0);

            }) 
            
        setSelectedFacilities(facilities);
        
    }, []);

return (
    <Card>
        <CardHeader
            className="flex flex-col">
            <h1 className='font-bold mb-2'>Select the facilities offered in your home</h1>
            <div className='text-sm'>
                <div>Place your mouse pointer on the facility for desciption.</div>
                <div>Long press if you are using a mobile ot tablet.</div>
            </div>
        </CardHeader>
        <CardContent>
            <div className="grid grid-cols-1 gap-4 w-full mx-auto mb-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-4">
                <input type='hidden' name='selectedFacilities' value={JSON.stringify(selectedFacilities)} />
                {
                    FacilityTooltip.map((v, i) => {
                        return(
                            <div key={i} className='cursor-pointer'>
                                <Card 
                                    className={selectedFacilities[i] ? 'border-primary border-4' : ''}
                                    onClick={() => { 
                                            const selectedFac = [...selectedFacilities];
                                            selectedFac[i] = selectedFac[i] === 1 ? 0 : 1;

                                            setSelectedFacilities(selectedFac);
                                        }}>
                                    <CardHeader className='flex flex-col items-center text-sm'>
                                        <GetFacilityIconById facilityIconId={i} />
                                        <div className='text-xs'>
                                            {v}
                                        </div>
                                    </CardHeader>
                                </Card>
                            </div>
                        )
                    })
                }
            </div>
        </CardContent>
    </Card>
  )
}

export default SelectFacilities