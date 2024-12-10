import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import Image from 'next/image'
import React from 'react'
import ProcessingGIF from '@/../public/loading.gif';

function ProcessingPopup({ state }: { state:boolean }) {
  return (
    <Dialog open={state}>
        {/* <DialogTrigger>Open</DialogTrigger> */}
        <DialogContent className='w-2/3'>
            <DialogHeader>
                <DialogTitle>
                    <Image src={ProcessingGIF}
                        alt='Processing GIF'
                        className='w-[50%] h-[50%]'
                    />
                </DialogTitle>
            </DialogHeader>
        </DialogContent>
    </Dialog>
  )
}

export default ProcessingPopup