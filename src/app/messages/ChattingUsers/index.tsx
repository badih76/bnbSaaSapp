'use client'

import React, { useEffect, useState } from 'react'
import { ISelectedChatUser } from '../ChatBlock'
import { getChattingUsers } from '@/app/actions/actions'

interface IData {
    uid: string;
    firstName: string;
    lastName: string;
    email: string;
}

function ChattingUsers({ userId, setSelectedChatUser }
    : { 
        userId: string,
        setSelectedChatUser: (uid: ISelectedChatUser) => void 
    }) {    
    
    const [ data, setData ] = useState<IData[]>();

    useEffect(() => {
        getChattingUsers(userId)
            .then(res => {
                setData(res);
            })
            .catch(ex => {
                console.log('Error: ', ex);
            })

    }, [])
    
  return (
    <>
        {
            data ? (
                data.map(d => {
                    if(d.uid !== userId)
                    return(
                        <div key={d.uid} onClick={() => {
                            setSelectedChatUser({
                                uid: d.uid,
                                userName: d.firstName + ' ' + d.lastName
                            });
                        }}>
                            {`${d.firstName} ${d.lastName}`}
                        </div>
                    )
                })

            ) : null
        }
    </>
)
}

export default ChattingUsers