import { categoryItems } from "@/data/categoryItems";
import Image from 'next/image';


const CategoryShowCase = ({ categoryName }: { categoryName: string }) => {
    const category = categoryItems.find((item) => item.name === categoryName);

    return (
        <div className='flex items-center gap-2'>
            <Image src={ category ? category.imageUrl! : "" }
                alt={ category ? category.name! : "Category Image" }
                width={44} height={44}
            />
            { category?.title }
        </div>
    )
}

export default CategoryShowCase;