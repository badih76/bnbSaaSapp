import { KindeUser } from '@kinde-oss/kinde-auth-nextjs/types'
import { MenuIcon } from 'lucide-react'
import React from 'react'

interface IUserIconParams {
    userPicture: string
}

function UserIcon(params: IUserIconParams ) {
  return (
    <div className="rounded-full border px-2 py-2 lg:px-4 lg-py-2 flex items-center gap-x-3">
        <MenuIcon className="w-6 h-6 lg:w-5 lg:h-5" />

        <img src={ params.userPicture ?? "https://cdn-icons-png.flaticon.com/512/149/149071.png" }
            alt="User Image Icon"
            className="rounded-full h8 w-8 hidden lg:block" referrerPolicy={'no-referrer'}
        />
    </div>
  )
}

export default UserIcon