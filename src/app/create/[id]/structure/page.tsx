import { createCategory } from "@/app/actions/actions";
import CreateScreenBottomBar from "@/app/my-components/CreateScreenBottomBar";
import SelectCategory from "@/app/my-components/SelecteCategory";

export default function StructureRoute({ params }: { params: { id: string } } ) {
    console.log("create structure page");

    return (
        <>
            <div className="w-3/5 mx-auto">
                <h2 className="text-3xl font-semibold tracking-tight transition-colors">
                    Which of these best describes your home?
                </h2>
            </div>

            <form action={createCategory}>
                <input type="hidden" name="homeId" value={params.id} />
                <SelectCategory />

                <CreateScreenBottomBar />
            </form>
        </>
    )
}