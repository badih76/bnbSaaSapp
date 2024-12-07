import { ReactNode } from "react";

interface IParams {
    children: ReactNode
}

export default function LayoutCreation({children}:IParams) {
    return (
        <div className="mt-10">
            {children}
        </div>
    )
}