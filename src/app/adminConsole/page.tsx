'use client'

import { Label } from '@/components/ui/label';
import React, { useEffect, useState } from 'react'
import ThumnailsComponent from '../my-components/ThumbnailsComponent';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { checkProfane } from "@/lib/utils";
import { getAppNameFromSettings, getLogoImageFromSettings } from '../actions/actions';


const useAPI = process.env.USE_API === "1" ? true : false;


function AdminConsole() {

    const [ appName, setAppName ] = useState<string>('');
    const [ newImage, setNewImage ] = useState<any>();

    const [ openProfaneWarning, setOpenProfaneWarning ] = useState<boolean>(false);
    

    // const [ dbImage, setDbImage ] = useState<string>('');
    // let dbImage = '';
    // useEffect(() => {

    useEffect(() => {
        
        const getLogo = async () => {
            let logo: string = '';
            logo = await getLogoImageFromSettings();

            console.log("Logo: ", logo);
            
            setNewImage(logo);
        }
        
        const getAppName = async () => {
            let aName: string = '';
            aName = await getAppNameFromSettings();

            console.log('aName: ', aName)

            setAppName(aName);
        }

        getLogo();
        getAppName();
        console.log(openProfaneWarning)
    }, []);

    //     async function getData () {
            
                
            // console.log(newImage);
            // const objImg = JSON.parse(mydata[0].setLogo!);
            // console.log(objImg);
            // dbImage = mydata[0].setLogo!.toString();
    //     }
    //     getData();
    // }, [])

  return (
    <div className='w-[75%] mx-auto mt-10 pb-10'>
        <h1 className='font-bold text-2xl mb-5 text-primary'>Admin Console</h1>
        {/* <form action={useAPI ? "/api/createHome/addHomeDescription" : CreateDescription} > */}
        <form action={"/api/adminConsole/uploadLogo"} className="w-full text-primary" method="POST"
                encType={useAPI ? "multipart/form-data" : "application/x-www-form-urlencoded"}>
            <div className="w-4/5 mx-auto">                            
                <div className="mx-auto w-full mt-10 flex flex-col gap-y-5 pb-16 ">
                    <div className="flex flex-col gap-y-2">
                        <Label>App Name</Label>
                        <Input name="title" value={appName}
                            onChange={(e) => checkProfane(e.currentTarget.value, setOpenProfaneWarning)}
                            required 
                            placeholder="Short and simple..."
                        />
                    </div>
                </div>

                <h2 className="text-xl font-semibold text-primary tracking-tight transaction-colors lg:text-3xl">
                    Please, select an image
                </h2>

                <div className="mx-auto w-full mt-10 flex flex-col gap-y-5 pb-16 ">
                    <div className="flex flex-col gap-y-2">
                        <Label>Image</Label>                           
                        <ThumnailsComponent />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <Button variant={'default'} >Submit</Button>
                    </div>
                </div>
            </div>
        </form>
        <div className="w-full text-primary border-red-600 border-3">
            {
                newImage && newImage.length !== 0 
                ? <img src={newImage} alt='Loaded image' />
                // ? <Image src={dbImage} width={100} height={75} alt='Something' />
                : null
            }
        </div>
    </div>
  )
}

export default AdminConsole