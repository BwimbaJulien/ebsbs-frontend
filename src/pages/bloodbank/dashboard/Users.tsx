import { getBloodBankWorkers } from "@/api/authentication";
import { BloodBankUsersTable } from "@/components/tables/bloodBankEmployeesTable/BloodBankUsersTable";
import { Separator } from "@/components/ui/separator";
import UserManagementDialog, { UserDataTypes } from "@/components/widgets/UserManagementDialog";
import { useEffect, useState } from "react";

export default function Users() {
  const [users, setUsers] = useState<UserDataTypes[]>([]);

  useEffect(() => {
    getBloodBankWorkers()
    .then((response) => {
      setUsers(response);
    })
    .catch((error) => {
      console.log(error);
    })
  }, []);

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Users</h1>
        <UserManagementDialog />
      </div>
      <Separator />
      <div
        className="flex flex-1 p-4 border border-slate-200 rounded-lg shadow-sm"
      >
        <BloodBankUsersTable users={users} />
      </div>
    </>
  )
}
