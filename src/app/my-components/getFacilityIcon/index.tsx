import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { BathIcon, BriefcaseMedicalIcon, ChefHatIcon, MicrowaveIcon, SquareParkingIcon, ThermometerSnowflakeIcon, TvIcon, WashingMachineIcon, WavesLadderIcon, WifiIcon } from "lucide-react"

export const FacilityTooltip = [
    "Wifi",
    "Airconditioner",
    "Parking",
    "Microwave",
    "Kitchen",
    "Pool",
    "Bathtub",
    "Washing machine",
    "TV",
    "First Aid Kit"
]

/*
1   Wifi
2   Airconditioner
3   Parking
4   Microwave
5   Kitchen
6   Pool
7   Bathtub
*/

const GetFacilityIconById = ({ facilityIconId, isHomePage=false }: { facilityIconId: number, isHomePage?: boolean }) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <GetFacilityIcon facIconId={facilityIconId} isHomePage={isHomePage} />
                </TooltipTrigger>
                <TooltipContent>
                    { FacilityTooltip[facilityIconId] }
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default GetFacilityIconById;

export const GetFacilityIcon = ({ facIconId, isHomePage }: { facIconId: number, isHomePage: boolean }) => {
    switch (facIconId) {
        case 0: return <WifiIcon onClick={(e) => {
            e.preventDefault();
        }} cursor={isHomePage ? 'auto' : 'pointer'} />
        
        case 1: return <ThermometerSnowflakeIcon onClick={(e) => {
            e.preventDefault();
        }} cursor={isHomePage ? 'auto' : 'pointer'} />
        
        case 2: return <SquareParkingIcon onClick={(e) => {
            e.preventDefault();
        }} cursor={isHomePage ? 'auto' : 'pointer'} />

        case 3: return <MicrowaveIcon onClick={(e) => {
            e.preventDefault();
        }} cursor={isHomePage ? 'auto' : 'pointer'} />

        case 4: return <ChefHatIcon onClick={(e) => {
            e.preventDefault();
        }} cursor={isHomePage ? 'auto' : 'pointer'} />

        case 5: return <WavesLadderIcon onClick={(e) => {
            e.preventDefault();
        }} cursor={isHomePage ? 'auto' : 'pointer'} />

        case 6: return <BathIcon onClick={(e) => {
            e.preventDefault();
        }} cursor={isHomePage ? 'auto' : 'pointer'} />

        case 7: return <WashingMachineIcon onClick={(e) => {
            e.preventDefault();
        }} cursor={isHomePage ? 'auto' : 'pointer'} />

        case 8: return <TvIcon onClick={(e) => {
            e.preventDefault();
        }} cursor={isHomePage ? 'auto' : 'pointer'} />

        case 9: return <BriefcaseMedicalIcon onClick={(e) => {
            e.preventDefault();
        }} cursor={isHomePage ? 'auto' : 'pointer'} />
    }
}