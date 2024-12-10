import { createCategory } from "@/app/actions/actions";
import CreateScreenBottomBar from "@/app/my-components/CreateScreenBottomBar";
import SelectCategory from "@/app/my-components/SelecteCategory";

const useAPI = process.env.USE_API === "1" ? true : false;

export default function StructureRoute({ params }: { params: { id: string } } ) {

    return (
        <>
            <div className="w-3/5 mx-auto">
                <h2 className="text-xl font-semibold tracking-tight transition-colors text-primary lg:text-3xl">
                    Which of these best describes your home?
                </h2>
            </div>

            <form action={useAPI ? "/api/createHome/addHomeCategory" : createCategory} method="POST">
                <input type="hidden" name="homeId" value={params.id} />
                <SelectCategory />

                <CreateScreenBottomBar />
            </form>
        </>
    )
}