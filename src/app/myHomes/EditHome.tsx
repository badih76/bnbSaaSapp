'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { EditIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import SelectCategory from '../my-components/SelecteCategory'
import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardHeader } from '@/components/ui/card'
import Counter from '../my-components/Counter'
import SelectFacilities from '../create/[id]/description/facilities'
import { useCountries } from '@/data/getWorldCountries'
import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/skeleton'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import AddressSearchInput from '../my-components/AddressSearchInput'
import { getFlagURL } from '@/lib/utilsCode'
import { DialogClose } from '@radix-ui/react-dialog'
import { useKindeBrowserClient,  } from '@kinde-oss/kinde-auth-nextjs'
import { KindeAccessToken, KindeUser } from '@kinde-oss/kinde-auth-nextjs/types'
import { IHome } from '@/lib/interfaces'
import { getHomeDetailsSSF, log, updateHomeDetails } from '../actions/actions'
import { unstable_noStore as noStore } from 'next/cache'
import { ELogLevel, ILogObject } from '@/loggerServices/loggerInterfaces'
import { redirect } from 'next/navigation'


const useAPI = process.env.USE_API === "1" ? true : false;

const getHomeDetails = async (userId: string | undefined, accessToken: KindeAccessToken | null,homeId: string) => {
    noStore();
    
    try {
        if(useAPI) {
            console.log("Using API calling from Edit Home page")
    
            try {
                const domain = process.env.KINDE_SITE_URL //getDomainName();
        
                const res = await fetch(domain + '/api/handleHome/get',
                    {
                      method: 'post',
                      cache: "no-cache",
                      body: JSON.stringify({ userId, accessToken, homeId })
                    });
        
                const data = await res.json();
    
                return data.data;
                    
            } catch(err) {
                console.log("Error: ", (err as any).message);
                return {};
            }
        } else {
            const data = await getHomeDetailsSSF(homeId);
    
            return data;
    
        }    

    } catch(ex) {
        const logObj: ILogObject = {
            level: ELogLevel.Error,
            message: `Error: ${(ex as Error).message}`,
            metaData: {
                service: "ESM-bnb-14",
                module: "Favorites Page",
                category: "Favorites",
                stackdump: (ex as Error).stack,
        }};

        log(logObj);
        return [];
    }
    
}

function EditHome({ homeId }: { homeId: string }) {
    const { getAllCountries } = useCountries();
    const [ homeData, setHomeData ] = useState<IHome>();
    
    const [ selectedCountry, setSelectedCountry ] = useState("OM");
    const [ lon, setLon ] = useState<number | null>(-0.09);
    const [ lat, setLat ] = useState<number | null>(52.505);
    const [ zoom, setZoom ] = useState<number | null>(6);
    const [ address, setAddress ] = useState<string | null>('');

    const LazyMap = dynamic(() => import('@/app/my-components/Map'), {
        ssr: false,
        loading: () => <Skeleton className='h-[50vh] w-full' />
    })

    const { getUser, getAccessToken } = useKindeBrowserClient();
    let accessToken: KindeAccessToken | null = null;
    let user: KindeUser<Record<string, string>> | null = null

    try {
        user = getUser();
        if(!user || !user.id) redirect("api/auth/login?");

        accessToken = getAccessToken();

    } catch(ex) {
        const logObj: ILogObject = {
            level: ELogLevel.Error,
            message: `Error: ${(ex as Error).message}`,
            metaData: {
                service: "ESM-bnb-14",
                module: "My Home Page - EditHome",
                category: "My Home",
                stackdump: (ex as Error).stack,
        },
        };
        log(logObj);
    }


    const setMarker = (ln: number | null, lt: number | null, z: number | null, add: string | null) => {
        setLon(ln);
        setLat(lt);
        setZoom(z);
        setAddress(add);
    }

    useEffect(() => {
        getHomeDetails(user?.id, accessToken, homeId)
        .then(data => {
            setHomeData(data[0]);
        });

    }, []);

    useEffect(() => {
        setSelectedCountry(homeData ? homeData.country! : "OM");

    }, [ homeData ]);

  return (
    <div>
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"outline"} type='button'>
                    <EditIcon onClick={(e) => {
                        e.preventDefault();
                    }}
                    />
                </Button>
            </DialogTrigger>
            <DialogContent className={cn('max-w-[60vw]')}>
                <form className='gap-4 flex flex-col' method='post'
                    action={useAPI ? "/api/createHome/addHomeCategory" : updateHomeDetails}
                    encType={useAPI ? "multipart/form-data" : "application/x-www-form-urlencoded"}>
                    <input type='hidden' name='homeId' value={homeId} />
                    <input type='hidden' name='userId' value={user?.id} />
                    <input type='hidden' name='accessToken' value={accessToken ? JSON.stringify(accessToken) : undefined} />
                    <input type="hidden" name="countryValue" value={selectedCountry} />
                    <input type="hidden" name="addressValue" value={address ?? ''} />
                    
                    <DialogHeader>
                        <DialogTitle asChild>
                            <h1 className='text-lg font-bold text-primary pb-3'>Edit Home Details</h1>
                        </DialogTitle>
                        <DialogDescription></DialogDescription>
                    
                        <div className='flex flex-col gap-2 w-full overflow-y-scroll max-h-[65vh]'>
                            <div className='font-medium'>
                                Which of these best describes your home?
                            </div>
                            <div className='w-full'>

                                <SelectCategory isEditing={true} defaultValue={homeData ? homeData.categoryName! : ""} />
                            </div>

                            <Separator />

                            <div className='font-medium'>
                                Please, describe your home as good as you can
                            </div>

                            <div className="mx-auto w-full mt-5 pl-2 pr-5 flex flex-col gap-y-5 mb-5 ">
                                <div className="flex flex-col gap-y-2">
                                    <Label>Title</Label>
                                    <Input name="title" 
                                        required 
                                        placeholder="Short and simple..."
                                        defaultValue={homeData?.title}
                                    />
                                </div>
                                <div className="flex flex-col gap-y-2">
                                    <Label>Description</Label>
                                    <Textarea 
                                        name="description"
                                        required
                                        placeholder="Please describe your home..." 
                                        defaultValue={homeData?.description}
                                    />
                                </div>
                                <div className="flex flex-col gap-y-2">
                                    <Label>Price</Label>
                                    <Input name="price" 
                                        type="number" min={10} step="0.01"
                                        required 
                                        placeholder="Price per night in USD..."
                                        defaultValue={homeData?.price}
                                    />
                                </div>
                                {/* <div className="flex flex-col gap-y-2">
                                    <Label>Image</Label>
                                    <Input name="image" 
                                        type="file"
                                        required 
                                        
                                    />
                                </div> */}
                                
                                <Card>
                                    <CardHeader 
                                        className="flex flex-col gap-y-5">
                                        <div className="flex items-center justify-between">
                                            <div className="flex flex-col">
                                                <h3 className="underline font-medium">
                                                    Guests:</h3>
                                                <p
                                                    className="hidden lg:block text-muted-forground text-sm">
                                                    How many guests for this property?</p>
                                            </div>
                                            <div>
                                                <Counter name="guests" defaultValue={homeData?.guests} />
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex flex-col">
                                                <h3 className="underline font-medium">
                                                    Rooms:</h3>
                                                <p
                                                    className="hidden lg:block text-muted-forground text-sm">
                                                    How many rooms in this property?</p>
                                            </div>
                                            <div>
                                                <Counter name="bedrooms" defaultValue={homeData?.bedrooms} />
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex flex-col">
                                                <h3 className="underline font-medium">
                                                    Bathrooms:</h3>
                                                <p
                                                    className="hidden lg:block text-muted-forground text-sm">
                                                    How many bathrooms in this property?</p>
                                            </div>
                                            <div>
                                                <Counter name="bathrooms"  defaultValue={homeData?.bathrooms} />
                                            </div>
                                        </div>
                                    </CardHeader>
                                </Card>
                                <SelectFacilities defaultValue={homeData?.facilities} />
                            </div>

                            <Separator />

                            <div className='font-medium'>
                                Where is this home located?
                            </div>

                            <div className="mx-auto w-full pl-2 pr-5 mt-5 flex flex-col gap-y-5 mb-5 ">
                                <div className="flex flex-col gap-y-2">
                                    <Select required value={selectedCountry} onValueChange={(value) => 
                                        {
                                            setSelectedCountry(value);
                                            const country = getAllCountries().find((c) => {
                                                return c.value == value;
                                            })
                                            setLon(country ? country.latLang[1] : -0.09);
                                            setLat(country ? country.latLang[0] : 52.505);
                                            setZoom(6);
                                        }}>
                                        <SelectTrigger className='w-full'>
                                            <SelectValue placeholder='Select a country' 
                                                defaultValue={homeData?.country} />
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
                                </div>
                                <AddressSearchInput setMarker={setMarker} defaultValue={homeData?.address} />
                                <LazyMap country={selectedCountry} lon={lon} lat={lat} zoom={zoom} />
                            </div>
                        </div>
                    </DialogHeader>
                    <DialogFooter>
                        <LocalSubmitButton />
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    </div>
  )
}

export default EditHome

const LocalSubmitButton = () => {
    return (
        <div className='rounded-lg w-full flex flex-row justify-between bg-white p-5'>
            <div>
                <Button variant="destructive" onClick={(e) => {
                    e.preventDefault();
                }}>
                    <DialogClose>
                        Cancel
                    </DialogClose>
                </Button>
            </div>
            <div>
                <Button variant="default" type='submit'>
                    Submit
                </Button>
            </div>
        </div>
    )
}