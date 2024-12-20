'use client'

import React from 'react'
import GetFacilityIconById, { FacilityTooltip } from '@/app/my-components/getFacilityIcon';

function FacilitiesBlock({ facilities }: {
    facilities: number[]
}) {
  return (
    <div className='grid grid-cols-2 w-full pt-4 pb-4 gap-2'>
        {
            facilities.map((f, i) => {
                if(f === 1) 
                    return (
                        <div className='flex flex-row gap-3' key={i}>
                            <div className='flex justify-center items-center'>
                                <GetFacilityIconById facilityIconId={i} isHomePage={true}  />
                            </div>
                            <div className='flex justify-center items-center text-xs lg:text-sm'>
                                {FacilityTooltip[i]}
                            </div>
                        </div>
                    )

            })

        }
    </div>

  )
}

export default FacilitiesBlock