import { Button } from "@/components/ui/button";
import ManageUserForm from "@/components/widgets/ManageUserForm";
import { Link } from "react-router-dom";

export default function AddUser() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Add New User</h1>
        <Button type="button" variant={'link'}>
          <Link to="/dashboard/a/users">Go Back</Link>
        </Button>
      </div>
      <div
        className="flex flex-1 p-4 border rounded-lg shadow-sm"
      >
        <ManageUserForm />
      </div>
    </>
  )
}
