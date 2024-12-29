import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

export function HomeListingButton ({ buttonLabel }: { buttonLabel: string }) {
    const { pending } = useFormStatus();

    return (
    <>
        {
            pending ? (
              <Button variant={"destructive"} 
                size={"lg"} className={cn('w-[10vw]')}
                type='submit' disabled>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    Please, wait...
                </Button>
            )
            : (
              <Button variant={"destructive"} 
                size={"lg"} className={cn('w-[10vw]')}
                type='submit'>
                <DialogClose>
                    { buttonLabel }
                </DialogClose>
            </Button>
            )
        }
    </>
    )
}