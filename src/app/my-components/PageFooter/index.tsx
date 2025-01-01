import React from 'react'
import SocialMediaButtons from './SocialMediaButtons'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'

function PageFooter() {
  return (
    <div className='w-full lg:h-[25vh] 
        bg-primary text-white 
        grid grid-cols-1 lg:grid-cols-3 justify-center items-center
        border-t-5 border-gray-500'>
        <div className='h-full flex flex-col items-center'>
            <div className='flex justify-center items-center w-full'>
                <h1 className='text-2xl font-medium m-3'>ESM bnb Services</h1>
            </div>
            <Separator className='w-[80%]' />
            <SocialMediaButtons 
                facebook={"https://www.facebook.com/badih.barakat"} 
                twitter={"https://x.com/badih76"}    
                linkedin={"https://www.linkedin.com/in/badihbarakat/"}
                instagram={"https://www.instagram.com/badihbarakat/"}
                youtube={"https://www.youtube.com/@badihbarakat5832"}
                tiktok={"https://www.tiktok.com/?lang=en-EN"}
            />
            
            <div>
                © 2025 ESM bnb Services        
            </div>

        </div>
        <div className='h-full flex flex-col gap-3 justify-center lg:items-start items-center pt-4 text-sm'>
            <div>
                <Link href="#">
                    About Us
                </Link>
            </div>
            <div>
                <Link href="#">
                    Privacy Policy
                </Link>
            </div>
            <div>
                <Link href="#">
                    Terms & Conditions
                </Link>
            </div>
            <div>
                <Link href="#">
                    Contact us
                </Link>
            </div>
        </div>
        <div className='h-full flex flex-col gap-3 justify-center lg:items-start items-center pt-4 text-sm'>
            <div>
                <Link href="#">
                    Site Map
                </Link>
            </div>
        </div>
        <div className='h-full flex flex-col gap-3 pt-4'>
        </div>
    </div>
  )
}

export default PageFooter