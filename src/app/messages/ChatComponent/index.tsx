'use client'

import { Textarea } from '@/components/ui/textarea'
import React, { useEffect, useState } from 'react'
import RightMessage from './rightMessage'
import LeftMessage from './leftMessage'
import { ISelectedChatUser } from '../ChatBlock'
import { getMessages } from '@/app/actions/actions'


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

    useEffect(() => {
        getMessages(userId)
            .then(res => {
                setData(res);
            })
            .catch(ex => {
                console.log('Error: ', ex);
            })

    }, [ selectedChatUser ]);
    
    console.log(data);

  return (  
    <div className='h-full flex flex-col justify-end gap-2'>
        <div className='w-full h-full border border-gray-300 rounded-md p-2'>
            {
                data.map((d, i) => {
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
        <Textarea >

        </Textarea>
    </div>
)
}

export default ChatComponent;