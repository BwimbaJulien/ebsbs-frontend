import AddBloodBagForm from "@/components/forms/ManageBloodBagForm";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function UpdateBloodbag() {
    const navigate = useNavigate();
    return (
        <>
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold md:text-2xl">Add New User</h1>
                <Button type="button" variant={'link'} onClick={() => navigate(-1)}>Go Back</Button>
            </div>
            <div
                className="flex flex-1 p-4 border rounded-lg shadow-sm"
            >
                <AddBloodBagForm />
            </div>
        </>
    )
}
