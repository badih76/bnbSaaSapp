import React from 'react'

function RightMessage({ message, userName, dateTime }
    : { 
        message: string,
        userName: String,
        dateTime: string 
    }) {
  return (
    <div className='w-full flex flex-col items-end'>
        <div className='bg-green-300 border border-gray-300 
            rounded-tl-xl rounded-tr-xl rounded-bl-xl
            min-h-[5vh] p-2'>
            { message}
        </div>
        <div className='text-xs'>{`${userName} ${dateTime}`}</div>
    </div>
  )
}

export default RightMessage