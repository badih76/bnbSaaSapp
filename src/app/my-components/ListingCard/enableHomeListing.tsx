'use client'

import React from 'react'
import { Dialog, DialogHeader, DialogTitle, DialogContent, DialogTrigger, 
    // DialogDescription, 
    DialogClose} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { enableDisableCompleteHomeListing } from '@/app/actions/actions'
import { cn } from '@/lib/utils'
import { useFormStatus } from 'react-dom'
import { Switch } from '@/components/ui/switch'

function EnableHomeListing({ userId, homeId, checked }: {
    userId: string,
    homeId: string,
    checked: boolean
}) {
    return (
        <div className='flex flex-col justify-center items-center text-red-500  cursor-pointer'>
            <Dialog>
                <DialogTrigger asChild>
                    <div className='flex flex-col justify-center items-center'>
                        <Switch checked={checked} />
                    </div>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            { `Are you sure want to ${checked ? 'disable' : ' enable'} this Home Listing?` }
                        </DialogTitle>
                        {/* <DialogDescription>
                            This will tag this Home Listing as deleted to prevent it from appearing. It will not delete it from our system.
                        </DialogDescription> */}
                    </DialogHeader>
                    <form action={enableDisableCompleteHomeListing}>
                        <input type='hidden' name="homeId" value={homeId} />
                        <input type='hidden' name="userId" value={userId} />
                        <input type="hidden" name="checked" value={checked ? 1 : 0} />
                        <div className='flex flex-row w-full justify-end mx-auto px-3 gap-3 mt-10 lg:px-3'>
                            <DialogClose>
                                <Button variant={"outline"} 
                                size={"lg"} className={cn('w-[10vw]')}
                                // onClick={() => { setDialogOpen(false) }}
                                type='button'>
                                No
                                </Button>
                            </DialogClose>
                            <HomeListingEnableButton buttonLabel={checked ? "Disable" : "Enable"}/>
                        </div>
                    </form>     
                </DialogContent>
            </Dialog>
        </div>
      )
}

export default EnableHomeListing

export function HomeListingEnableButton ({ buttonLabel }: {
    buttonLabel: string
}) {
    const { pending } = useFormStatus();

    return (
    <>
        {
            pending ? (
              <Button variant={"destructive"} 
                size={"lg"} className={cn('w-[10vw]')}
                type='submit' disabled>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    Please, wait...
                </Button>
            )
            : (
              <Button variant={buttonLabel == "Disable" ? "destructive" : "default"} 
                size={"lg"} className={cn('w-[10vw]')}
                type='submit'>
                <DialogClose>
                    { buttonLabel }
                </DialogClose>
            </Button>
            )
        }
    </>
    )
}