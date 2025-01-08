'use client'

import React, { useEffect, useRef, useState } from 'react'
import { unstable_noStore as noStore } from 'next/cache'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { CheckIcon, XIcon } from 'lucide-react';
  
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { getListingsCount, getReservationsStatisticsEx, getUpcomingReservations, getUserSettings, log, showHideDeletedListings } from '@/app/actions/actions';
import { ELogLevel, ILogObject } from '@/loggerServices/loggerInterfaces';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { InteractiveBarchart } from '../DashboardBarChart/InteractiveBarchart';
import { IUserSettings } from '@/lib/interfaces';
import { Switch } from '@/components/ui/switch';


const getStatistics = async (userId: string) => {
    noStore();

    try {
        const reservationsStatistics = await getReservationsStatisticsEx(userId);
    
        const chartData: {monthyear: string, count: number, sales: number}[] = reservationsStatistics.map(r => {
            return { monthyear: r.month as string, count: r.resCount, sales: r.resSales }
        })
    
        return chartData;

    } catch(ex) {
        const logObj: ILogObject = {
            level: ELogLevel.Error,
            message: `Error: ${(ex as Error).message}`,
            metaData: {
                service: "ESM-bnb-14",
                module: "My Home Page - getReservationsStatistics",
                category: "My Home",
                stackdump: (ex as Error).stack,
        }};
        log(logObj);

        return [];
    }
   
}

interface IUpcominRes {
    title: string, 
    startDate: Date | null, 
    endDate: Date | null, 
    rate: number | null, 
    userName: string, 
    paid: boolean
}

function DashboardAccordion() {
    const { isLoading, user } = useKindeBrowserClient();

    const [ reservationsStatistics, setReservationStatistics ] = useState<{ monthyear: string, count: number, sales: number }[]>([]);
    const [ listingsCount, setListingCount ] = useState<number>(0);
    const [ upcomingReservations, setUpcomingReservations ] = useState<IUpcominRes[]>([]);
    const [ userId, setUserId ] = useState<string>('');
    const [ userSettings, setUserSettings ] = useState<IUserSettings>();

    useEffect(() => {
        async function getData(uid: string) {
            const resStat = await getStatistics(uid);
            setReservationStatistics(resStat);

            const listCount = await getListingsCount(uid);
            setListingCount(listCount);

            const ucRes = await getUpcomingReservations(uid);
            setUpcomingReservations(ucRes);

            const uSettings = await getUserSettings(uid);
            setUserSettings(uSettings);
        }

        if(!isLoading) {
            if(user && user.id) {
                setUserId(user.id);

                getData(user.id);
                
            }
        }

    }, [ isLoading ])

  return (
    <Accordion type='single' collapsible className='w-full border border-gray-400 rounded-lg 
        p-2 mt-4 mb-4 bg-white'>
        <AccordionItem value='dashboard' className='border-none'>
            <AccordionTrigger className='text-xl font-bold text-primary pl-2'>Dashboard</AccordionTrigger>
            <AccordionContent>
                <div className='grid grid-flow-row grid-cols-9 gap-2
                    border-2 rounded-lg border-gray-300 
                    p-3 mt-2 min-h-[10vh]'>

                    <div className='border border-gray-300 rounded-lg 
                        col-span-2 p-2 min-h-[10vh]'>
                        <h2 className='text-md font-semibold tracking-tight text-primary mb-4'>Quick Totals</h2>
                        
                        <div className='flex flex-col gap-5 h-[90%] justify-between'>
                            <div>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[100px]">Type</TableHead>
                                            <TableHead className='text-right'>Total</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className="font-medium">Listings</TableCell>
                                            <TableCell className='text-right'>{ listingsCount }</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-medium">Reservations</TableCell>
                                            <TableCell className='text-right'>{ 
                                                reservationsStatistics.reduce((accum, currVal) => accum + currVal.count, 0)
                                            }</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-medium">Revenue</TableCell>
                                            <TableCell className='text-right'>${ 
                                                reservationsStatistics.reduce((accum, currVal) => accum + currVal.sales, 0)
                                            }</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>

                            </div>
                            
                            {/* <ShowHideDeletedListings userId={userId} checked={userSettings?.hideDeletedListings} /> */}
                            {/* <UserSettings userId={userId} userSettings={userSettings!} /> */}

                            <div className='flex flex-row justify-between pl-2 pr-2'>
                                <div>
                                    Hide deleted listings: 
                                </div>        
                                <div>
                                    <Switch checked={userSettings?.hideDeletedListings} onCheckedChange={(e) => {
                                        const newUserSettings: IUserSettings = { currency: userSettings?.currency!, 
                                                hideDeletedListings: !userSettings?.hideDeletedListings };
                                        setUserSettings(newUserSettings);

                                        showHideDeletedListings(userId, !userSettings?.hideDeletedListings);

                                    }} />
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className='border border-gray-300 rounded-lg col-span-4 p-2 min-h-[10vh] overflow-y-auto'>
                        <h2 className='text-md font-semibold tracking-tight text-primary mb-4'>Upcoming Reservations</h2>

                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead >Home</TableHead>
                                    <TableHead >Start Date</TableHead>
                                    <TableHead >End Date</TableHead>
                                    <TableHead >Rate / night</TableHead>
                                    <TableHead >Total</TableHead>
                                    <TableHead >Client</TableHead>
                                    <TableHead >Paid?</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    upcomingReservations.map(r => {
                                        return (
                                            <>
                                                <TableRow>
                                                    <TableCell colSpan={7} className='font-medium'>
                                                        { r.title }
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className="font-medium"></TableCell>
                                                    <TableCell >{ r.startDate?.toLocaleDateString() }</TableCell>
                                                    <TableCell >{ r.endDate?.toLocaleDateString() }</TableCell>
                                                    <TableCell >${ r.rate }</TableCell>
                                                    <TableCell >${ 
                                                        Math.round((new Date(r.endDate!).getTime() 
                                                                - new Date(r.startDate!).getTime()) 
                                                                / (1000 * 3600 * 24)) * r.rate!
                                                    }</TableCell>
                                                    <TableCell >${ r.userName }</TableCell>
                                                    <TableCell >{ r.paid ? <CheckIcon /> : <XIcon /> }</TableCell>
                                                </TableRow>
                                            </>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </div>

                    {/* <DashboardBarChart chartData={reservationsStatistics}/> */}
                    <div className='col-span-3'>
                        <InteractiveBarchart myChartData={reservationsStatistics} />

                    </div>
                    
                </div>
            </AccordionContent>
        </AccordionItem>
    </Accordion>
  )
}

export default DashboardAccordion