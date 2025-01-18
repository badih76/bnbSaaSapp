'use client'

import { sendMessageToHost } from '@/app/actions/actions';
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { checkProfane } from '@/lib/utils';
import React, { useEffect, useRef, useState } from 'react'

function ContactHost({ uid, hostId }: {
  uid: string,
  hostId: string
}) {
    const [ openProfaneWarning, setOpenProfaneWarning ] = useState<boolean>(false);
    const [ profaneWarning, setProfaneWarning ] = useState<boolean>(false);
    const refMessageToHost = useRef<HTMLTextAreaElement>(null);
    const [ disabledSend, setDisabledSend ] = useState<boolean>(true);
    const [ hideSentMessage, setHideSentMessage ] = useState<boolean>(true);

  useEffect(() => {
    // setOpenProfaneWarning(profaneWarning);
    // console.log("Profane: ", profaneWarning);

  }, [ profaneWarning ]);

  return (
    <div className='w-full mt-5 flex flex-col gap-2'>
        <h1 className='font-medium'>Contact Host</h1>
        
        <textarea className='w-full min-h-[20vh] rounded-md' ref={refMessageToHost}
          onChange={(e) => {
              checkProfane(e.currentTarget.value, setProfaneWarning);
              checkProfane(e.currentTarget.value, setOpenProfaneWarning);
              setDisabledSend(e.currentTarget.value as string === '');
              setHideSentMessage(true);
            }}
            aria-multiline={true} />

        <div className='text-right'>
            <Button variant={"default"} disabled={disabledSend || profaneWarning}
              onClick={(e) => {
                e.preventDefault();
                // send the message to the host
                const message = refMessageToHost.current?.value as string;

                if(message !== '' && !profaneWarning) {
                  const messageSendingResult = sendMessageToHost(message, uid, hostId);
                  // clear the message box
                  setHideSentMessage(false);
                  console.log(messageSendingResult);
                  refMessageToHost.current!.value = '';

                }

              }}>Send</Button>
              <div className='text-green-400 text-sm' hidden={hideSentMessage}>Message sent</div>
        </div>
        <Dialog open={openProfaneWarning} onOpenChange={setOpenProfaneWarning}>
            {/* <DialogTrigger asChild>
                <Button variant="outline">Edit Profile</Button>
            </DialogTrigger> */}
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                <DialogTitle>Warning: Inappropriate Language Detected 🚫</DialogTitle>
                    <DialogDescription>
                        <>
                            <p>Please note that the use of offensive or profane language is prohibited on this website.</p>
                            <p>Your text will not be accepted until it is cleaned.</p>
                            <p>Let&lsquos keep our community positive and respectful for everyone. Thank you for your understanding!</p>
                        </>
                    </DialogDescription>
                </DialogHeader>                                
                <DialogFooter>
                    <Button type="button" onClick={() => setOpenProfaneWarning(false) }>Ok</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
  )
}

export default ContactHost