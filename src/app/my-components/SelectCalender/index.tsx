'use client'

import React, { useState } from 'react'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

import { DateRange } from 'react-date-range';
import { eachDayOfInterval } from 'date-fns';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';


function SelectCalender({ reservation }: {
    reservation: {
        startDate: Date,
        endDate: Date
    }[] | undefined}) {

    const [ state, setState ] = useState([{
        startDate: new Date(),
        endDate: new Date(),
        key: "selection"
    }]);

    let disabledDates: Date[] = [];

    reservation?.forEach((reservationItem) => {
        const dateRange = eachDayOfInterval({
            start: new Date(reservationItem.startDate), 
            end: new Date(reservationItem.endDate)
        });

        disabledDates = [...disabledDates, ...dateRange];
    })

  return (
    <>
        <input type='hidden' name="startDate" value={state[0].startDate.toISOString()} />
        <input type='hidden' name="endDate" value={state[0].endDate.toISOString()} />

        <DateRange 
            date={ new Date()}
            showDateDisplay={false}
            rangeColors={["#FF5A5F"]}
            ranges={state}
            onChange={(item) => setState([item.selection as any])}
            minDate={new Date()}
            direction="vertical"
            disabledDates={disabledDates}
        />
    </>
  )
}

export default SelectCalender
