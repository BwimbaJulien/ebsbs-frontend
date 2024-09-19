import { getBloodBankWorkers } from "@/api/authentication";
import { BloodBankUsersTable } from "@/components/tables/bloodBankEmployeesTable/BloodBankUsersTable";
import { Button } from "@/components/ui/button";
import { UserDataTypes } from "@/components/widgets/ManageUserForm";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Users() {
  const [users, setUsers] = useState<UserDataTypes[]>([]);
  const bloodBankId = JSON.parse(localStorage.getItem("bloodbankAdmin") as string).bloodBankId;

  useEffect(() => {
    getBloodBankWorkers(bloodBankId)
    .then((response) => {
      setUsers(response.bloodBankRecorders);
    })
    .catch((error) => {
      console.log(error);
    })
  }, [bloodBankId]);

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Users</h1>
        <Button>
          <Link to="/dashboard/users/new">Add User</Link>
        </Button>
      </div>
      <div
        className="flex flex-1 p-4 border border-slate-200 rounded-lg shadow-sm"
      >
        <BloodBankUsersTable users={users} />
      </div>
    </>
  )
}
