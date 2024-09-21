import { Button } from "@/components/ui/button";
import ManageUserForm from "@/components/forms/ManageUserForm";
import { useNavigate } from "react-router-dom";

export default function AddUser() {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Record Blood Bag</h1>
        <Button type="button" variant={'link'} onClick={() => navigate(-1)}>Go Back</Button>
      </div>
      <div
        className="flex flex-1 p-4 border rounded-lg shadow-sm"
      >
        <ManageUserForm />
      </div>
    </>
  )
}
