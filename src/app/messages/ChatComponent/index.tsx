'use client'

import { Textarea } from '@/components/ui/textarea'
import React, { useEffect, useRef, useState } from 'react'
import RightMessage from './rightMessage'
import LeftMessage from './leftMessage'
import { ISelectedChatUser } from '../ChatBlock'
import { getMessages, sendMessageToHost } from '@/app/actions/actions'
import { checkProfane } from '@/lib/utils'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Loader2, SendHorizonal } from 'lucide-react'


interface IData {
    id: string;
    msgDateTime: Date | null;
    msgFrom: string | null;
    msgTo: string | null;
    msgMessage: string | null;
    msgAttachments: string | null;
    msgSeen: boolean | null;
};

function ChatComponent({ userId, selectedChatUser }
    : { 
        userId: string,
        selectedChatUser: ISelectedChatUser | undefined
    }) {
 
    const [ data, setData ] = useState<IData[]>([]);
    const [ profaneWarning, setProfaneWarning ] = useState<boolean>(false);
    const [ openProfaneWarning, setOpenProfaneWarning ] = useState<boolean>(false);
    const [ sendingMessage, setSendingMessage ] = useState<boolean>(false);

    const refMessage = useRef<HTMLTextAreaElement>(null);
    const refMessagesBlock = useRef<HTMLDivElement>(null);

    useEffect(() => {
        refMessagesBlock.current!.scrollTop = refMessagesBlock.current!.scrollHeight;
        
    }, [ data ])

    useEffect(() => {
            refMessagesBlock.current!.scrollTop = refMessagesBlock.current!.scrollHeight;
            
    }, [ refMessagesBlock.current?.scrollHeight ])

    useEffect(() => {
        getMessages(userId)
            .then(res => {
                setData(res);
            })
            .catch(ex => {
                console.log('Error: ', ex);
            })

    }, [ selectedChatUser ]);

    
    const onMessageEnterPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if(e.keyCode == 13 && e.shiftKey == false) {
            e.preventDefault();

            // send the message to the host
            const message = refMessage.current?.value as string;

            if(message !== '' && !profaneWarning) {
                setSendingMessage(true);
                
                const messageSendingResult = sendMessageToHost(message, userId, selectedChatUser!.uid!);
                // clear the message box
                console.log(messageSendingResult);
                refMessage.current!.value = '';

                getMessages(userId)
                    .then(res => {
                        setData(res);
                        setSendingMessage(false);
                        // refMessagesBlock.current!.scrollTop = refMessagesBlock.current!.scrollHeight;

                    })
                    .catch(ex => {
                        console.log('Error: ', ex);
                    })

            }
        }
    }
    
  return (  
    <div className='h-full flex flex-col justify-end gap-2'>
        <div className='w-full max-h-[50vh] h-full border border-gray-300 rounded-md p-2 overflow-y-auto'
            ref={refMessagesBlock}>
            {
                data.map((d, i) => {
                    // if(i+1 == data.length) setLastMessage(true);

                    if(d.msgFrom === userId) {
                        return (
                            <RightMessage message={d.msgMessage!} key={i}
                                userName={'User Name'} dateTime={new Date(d.msgDateTime!).toDateString() }  />
                        )
                    } else {
                        return (
                            <LeftMessage message={d.msgMessage!} key={i}
                                userName={'User Name'} dateTime={new Date(d.msgDateTime!).toDateString() }  />
                        )
                    }

                })
            }
        </div>
        <div className='flex flex-row gap-2'>
            <Textarea ref={refMessage} onKeyDown={onMessageEnterPress}
                onChange={(e) => {
                    checkProfane(e.currentTarget.value, setProfaneWarning);
                    checkProfane(e.currentTarget.value, setOpenProfaneWarning);
                }} >

            </Textarea>
            <div className='flex justify-center items-center'>
                {
                    !sendingMessage ? 
                        <SendHorizonal size={32} 
                            className='cursor-pointer text-primary' 
                            onClick={() => {
                                // send the message to the host
                                const message = refMessage.current?.value as string;

                                if(message !== '' && !profaneWarning) {
                                    setSendingMessage(true);

                                    const messageSendingResult = sendMessageToHost(message, userId, selectedChatUser!.uid!);
                                    // clear the message box
                                    console.log(messageSendingResult);
                                    refMessage.current!.value = '';

                                    getMessages(userId)
                                        .then(res => {
                                            setData(res);
                                            setSendingMessage(false);
                                            // refMessagesBlock.current!.scrollTop = refMessagesBlock.current!.scrollHeight;

                                        })
                                        .catch(ex => {
                                            console.log('Error: ', ex);
                                        })

                                }
                            }}/>
                        : <Loader2 size={24} className='mr-2 animate-spin' />
                }
                
            </div>
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

export default ChatComponent;