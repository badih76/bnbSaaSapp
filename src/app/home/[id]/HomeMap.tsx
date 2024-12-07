import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

const HomeMap = ({ locationValue, zoom }: { locationValue: string, zoom?: number }) => {
    const LazyMap = dynamic( () => import('@/app/my-components/Map'),
    {
        ssr: false,
        loading: () => <Skeleton className="h-[50vh] w-full" />
    });

    return <LazyMap country={locationValue as string} 
        lon={null} lat={null} zoom={zoom ?? 8}  />
}

export default HomeMap;