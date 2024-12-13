'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import SubmitButtons from '../SubmitButtons'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from '@/lib/utils'
import { removeFromHomeListing } from '@/app/actions/actions'
import { useFormStatus } from 'react-dom'
import { Loader2 } from 'lucide-react'
// import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

// const useAPI = process.env.USE_API === "1" ? true : false;

interface IParams {
  userId?: string,
  homeId?: string,
  enabled: boolean
}
function CreateScreenBottomBar({ userId, homeId, enabled }: IParams) {
 
  return (
    <div className="fixed w-full bottom-0 left-0 z-10 bg-white border-t h-24">
        <div className="flex items-center justify-between mx-auto px-5 lg:px-10 h-full">
            <Button variant={"secondary"} size="lg" asChild>
                <Link href="/">
                    Cancel
                </Link>
            </Button>        
              
            <Dialog 
              // open={dialogOpen} onOpenChange={setDialogOpen}
              >
              <DialogTrigger asChild>
                <Button variant={"destructive"} size="lg">
                  {/* <Link href="/"> */}
                      Delete
                  {/* </Link> */}
                </Button>  
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure you want to delete this home listing?</DialogTitle>
                </DialogHeader>
                  <form action={removeFromHomeListing}  
                    // action={useAPI ? "/api/handleListings/remove" : removeFromHomeListing} 
                    method="POST">
                    <input type="hidden" name="userId" value={userId} />
                    <input type="hidden" name="homeId" value={homeId} />

                    <div className='flex flex-row w-full justify-end mx-auto px-3 gap-3 mt-10 lg:px-3'>
                      <DialogClose>
                        <Button variant={"outline"} 
                          size={"lg"} className={cn('w-[10vw]')}
                          // onClick={() => { setDialogOpen(false) }}
                          type='button'>
                          No
                        </Button>
                      </DialogClose>
                      <HomeDeleteButton />
                    </div>
                  </form>
              </DialogContent>
            </Dialog>    

            <SubmitButtons enabled={enabled} />
        </div>
    </div>
  )
}

export default CreateScreenBottomBar

export function HomeDeleteButton () {
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
              <Button variant={"destructive"} 
                size={"lg"} className={cn('w-[10vw]')}
                type='submit'>
                Delete
            </Button>
            )
        }
    </>
    )
}