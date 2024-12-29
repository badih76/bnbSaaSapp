'use client'

import { Loader2, ShieldAlertIcon } from 'lucide-react'
import Image from "next/image";
import DeskTopLogo from "@/../public/Logo3.png";
import { Button } from '@/components/ui/button';
import { useFormStatus } from 'react-dom';
import { cn } from '@/lib/utils';
 
export default function Error() {

  const { pending } = useFormStatus();
 
  return (
    <div className="container flex flex-col justify-center items-center min-h-[70vh] mx-auto px-5 lg:px-10">
      <h1 className='text-xl text-red-600 m-3'><ShieldAlertIcon size={100} /></h1>
      <h1 className='text-2xl text-red-600'>Looks like something beyond control happend.</h1>

      <p>It seems our system has faced an issue. Apologies for the inconvenience.</p>
      <p>We took note of that and our tech scouts will be working to bring it back to safety.</p>

      <p>Please, click on our logo below to take you back to Main page.</p>
      <div className='mt-5'>
        <form action="/">
          {
              pending ? (
                <Button variant={"destructive"} 
                  size={"lg"} 
                  className={cn('w-[10vw] h-[15vh] border-none')}
                  type='submit' disabled>
                      <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                      Please, wait...
                  </Button>
              )
              : (
                <Button 
                  variant={"outline"} 
                  size={"lg"} 
                  className={cn('w-[10vw] h-[15vh] border-none')}
                  type='submit'>
                  <Image src={DeskTopLogo} 
                      alt="Desktop Logo" 
                      className="w-20 h-16 hidden lg:block" />

                  <Image src={DeskTopLogo} 
                      alt="Mobile Logo" 
                      className="block lg:hidden w-12" />
                </Button>
              )
          }
        </form>
      </div>
    </div>
  );
}
