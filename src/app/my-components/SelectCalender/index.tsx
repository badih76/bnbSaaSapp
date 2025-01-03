'use client'

import React, { useState } from 'react'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

import { DateRange } from 'react-date-range';
import { eachDayOfInterval } from 'date-fns';
import { Reservations } from '@/drizzle/schema';


function SelectCalender({ reservation }: {
    reservation: typeof Reservations.$inferInsert[] | undefined | null}) {

    const [ state, setState ] = useState([{
        startDate: new Date(),
        endDate: new Date(),
        key: "selection"
    }]);

    let disabledDates: Date[] = [];

    if(reservation && reservation !== null) {
        reservation.forEach((reservationItem) => {
            if(reservationItem !== null) {
                const dateRange = eachDayOfInterval({
                    start: new Date(reservationItem.startDate!), 
                    end: new Date(reservationItem.endDate!)
                });

                disabledDates = [...disabledDates, ...dateRange];
            }

        })
    }

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
