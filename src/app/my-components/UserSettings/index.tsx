'use client'

import React from 'react'
import { Dialog, DialogHeader, 
        // DialogTitle, 
        DialogContent, DialogTrigger, DialogClose } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Settings } from 'lucide-react'
import { showHideDeletedListings } from '@/app/actions/actions'
import { IUserSettings } from '@/lib/interfaces'
import { HomeListingButton } from '../ListingCard/HomeListingButtons'
import { cn } from '@/lib/utils'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
// import { Input } from '@/components/ui/input'

interface IProps {
    userId: string,
    userSettings: IUserSettings
}

function UserSettings(props: IProps) {
    
  return (
    <div className='w-full flex flex-row justify-between items-center'>
        <div className='text-lg'>
            User Settings
        </div>
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button>
                        <Settings />
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        User Settings
                    </DialogHeader>
                    <form action={showHideDeletedListings}>
                        <input type='hidden' name="userId" value={props.userId} />
                        <input type="hidden" name="checked" value={props.userSettings.hideDeletedListings ? 1 : 0} />
                        {/* <div className="flex flex-col gap-y-2 mt-3 mb-3">
                            <Label>First Name</Label>
                            <Input name="First Name" 
                                required 
                                placeholder="First Name"
                            />
                        </div> */}
                        <div className='w-full flex flex-row justify-between items-center'>
                            <Label>
                                Hide Deleted Listings
                            </Label>
                            <div>
                                <Switch name="hideDeletedListings" checked={props.userSettings.hideDeletedListings} />
                            </div>
                        </div>

                        <div className='w-full flex flex-row justify-between items-center'>
                            <Label>
                                Currency
                            </Label>
                            <div>
                                {/* add currency dropdown */}
                            </div>
                        </div>

                        <div className='flex flex-row w-full justify-end mx-auto px-3 gap-3 mt-10 lg:px-3'>
                            <DialogClose>
                                <Button variant={"outline"} 
                                size={"lg"} className={cn('w-[10vw]')}
                                type='button'>
                                No
                                </Button>
                            </DialogClose>
                            <HomeListingButton buttonLabel="Save" />
                        </div>
                    </form>     
                </DialogContent>
            </Dialog>
        </div>
    </div>
  )
}

export default UserSettings;