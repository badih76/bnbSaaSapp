import { getListingsCount, getReservationsStatisticsEx, getUpcomingReservations } from '@/app/actions/actions';
import { InteractiveBarchart } from '@/app/my-components/DashboardBarChart/InteractiveBarchart'
import { Logger } from '@/loggerServices/logger';
import { ELogLevel, ILogObject } from '@/loggerServices/loggerInterfaces';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { unstable_noStore as noStore } from 'next/cache'
import { redirect } from 'next/navigation';
import React from 'react'

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
        Logger.log(logObj);

        return [];
    }
   
}

async function Dashboard() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    // const accessToken = await getAccessToken();
    
    // // if(!user) return redirect("/");
    if(!user || !user.id) redirect("api/auth/login?");
    
    const reservationsStatistics = await getStatistics(user.id);
    const listingsCount = await getListingsCount(user.id);
    const upcomingReservations = await getUpcomingReservations(user.id);


    return (
        <>
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
                                    <div className='flex flex-row justify-between pl-2 pr-2'>
                                        <div>
                                            Hide deleted listings: 
                                        </div>
                                        <div>
                                            <Switch checked={true} />
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
        </>
    )
}

export default Dashboard