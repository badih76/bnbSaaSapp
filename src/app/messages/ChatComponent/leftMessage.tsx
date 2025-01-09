import React from 'react'

function LeftMessage({ message, userName, dateTime }
    : { 
        message: string,
        userName: String,
        dateTime: string 
    }) {
  return (
    <div className='w-full flex flex-col items-start'>
        <div className='bg-green-100 border border-gray-300 
            rounded-tl-xl rounded-tr-xl rounded-br-xl 
            min-h-[5vh] p-2'>
            { message}
        </div>
        <div className='text-xs'>{`${userName} ${dateTime}`}</div>
    </div>
  )
}

export default LeftMessage