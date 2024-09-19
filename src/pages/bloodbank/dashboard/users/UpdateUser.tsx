import { getBloodBankRecorderById } from "@/api/authentication";
import { Button } from "@/components/ui/button";
import ManageUserForm, { UserDataTypes } from "@/components/widgets/ManageUserForm";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function AddUser() {
  const params = useParams();
  const [user, setUser] = useState<UserDataTypes>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    if (params.userId as string) {
      getBloodBankRecorderById(params.userId as string)
        .then((res) => {
          if (res) {
            setIsLoading(false);
            setUser(res);
          }
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, [params.userId]);

  if (isLoading) {
    return <Loader2 size={40} className={"my-10 animate-spin"} />;
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Update User: {params.userId}</h1>
        <Button type="button" variant={'link'}>
          <Link to="/dashboard/users">Go Back</Link>
        </Button>
      </div>
      <div
        className="flex flex-1 p-4 border border-slate-200 rounded-lg shadow-sm"
      >
        <ManageUserForm user={user} />
      </div>
    </>
  )
}
