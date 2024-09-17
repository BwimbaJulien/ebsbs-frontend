import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import BloodBankUsersTable from "@/components/tables/BloodBankUsersTable";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Users() {
  const { users, setUsers } = useState([]);

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Overview</h1>
        <Button>
          <Link to="/dashboard/users/add">Add New User</Link>
        </Button>
      </div>
      <Separator />
      <div
        className="flex flex-1"
      >
        <BloodBankUsersTable />
      </div>
    </>
  )
}
