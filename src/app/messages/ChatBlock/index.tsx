'use client'

import React, { useState } from 'react'
import ChattingUsers from "../ChattingUsers";
import ChatComponent from "../ChatComponent";

export interface ISelectedChatUser {
    uid: string,
    userName: string
}

function ChatBlock({ userId }: {
    userId: string
}) {
    const [ selectedChatUser, setSelectedChatUser ] = useState<ISelectedChatUser>();

  return (
    <div className='flex flex-row gap-2 mt-5'>
        <div className='w-1/5 border border-gray-300 rounded-md 
            min-h-[50vh] p-3 bg-white'>
            <ChattingUsers userId={userId} setSelectedChatUser={setSelectedChatUser} />
        </div>
        <div className='w-4/5 border border-gray-300 rounded-md 
            min-h-[50vh] p-2 bg-white'>
            <ChatComponent userId={userId} selectedChatUser={selectedChatUser} />
        </div>
    </div>
  )
}

export default ChatBlock