import { CreateDescription } from "@/app/actions/actions";
import Counter from "@/app/my-components/Counter";
import CreateScreenBottomBar from "@/app/my-components/CreateScreenBottomBar";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import SelectFacilities from "./facilities";
import ThumnailsComponent from "@/app/my-components/ThumbnailsComponent";

const useAPI = process.env.USE_API === "1" ? true : false;

export default async function Decription (
    {params}: {params: {id: string}}
) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    return (
        <>
            <div className="w-3/5 mx-auto">
                <h2 className="text-xl font-semibold text-primary tracking-tight transaction-colors lg:text-3xl">
                    Please, describe your home as good as you can
                </h2>
                <form action={useAPI ? "/api/createHome/addHomeDescription" : CreateDescription} 
                    className="text-primary" method="POST"
                    encType={useAPI ? "multipart/form-data" : "application/x-www-form-urlencoded"}>
                {/* <form action={CreateDescription} className="text-primary" method="POST"> */}
                    <input type="hidden" name="homeId" value={params.id} />
                    <div className="mx-auto w-full mt-10 flex flex-col gap-y-5 mb-36 ">
                        <div className="flex flex-col gap-y-2">
                            <Label>Title</Label>
                            <Input name="title" 
                                required 
                                placeholder="Short and simple..."
                            />
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <Label>Description</Label>
                            <Textarea 
                                name="description"
                                required
                                placeholder="Please describe your home..." 
                            />
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <Label>Price</Label>
                            <Input name="price" 
                                type="number" min={10} step="0.01"
                                required 
                                placeholder="Price per night in USD..."
                            />
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <Label>Image</Label>
                            {/* <Input name="image" 
                                type="file"
                                required 
                            /> */}
                            <ThumnailsComponent />
                        </div>
                        
                        <Card>
                            <CardHeader 
                                className="flex flex-col gap-y-5">
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <h3 className="underline font-medium">
                                            Guests:</h3>
                                        <p
                                            className="hidden lg:block text-muted-forground text-sm">
                                            How many guests for this property?</p>
                                    </div>
                                    <div>
                                        <Counter name="guests" />
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <h3 className="underline font-medium">
                                            Rooms:</h3>
                                        <p
                                            className="hidden lg:block text-muted-forground text-sm">
                                            How many rooms in this property?</p>
                                    </div>
                                    <div>
                                        <Counter name="rooms" />
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <h3 className="underline font-medium">
                                            Bathrooms:</h3>
                                        <p
                                            className="hidden lg:block text-muted-forground text-sm">
                                            How many bathrooms in this property?</p>
                                    </div>
                                    <div>
                                        <Counter name="bathrooms" />
                                    </div>
                                </div>
                            </CardHeader>
                        </Card>
                        <SelectFacilities />
                    </div>

                <CreateScreenBottomBar homeId={params.id} userId={user.id} enabled={true} />
                </form>
            </div>
        </>
    )
}