import LoadingSkeleton from "@/components/widgets/LoadingSkeleton";
import { UserDataTypes } from "@/components/widgets/ManageUserForm";
import UserAccountForm from "@/components/widgets/UserAccountForm";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Profile() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<UserDataTypes>();
  const params = useParams();

  useEffect(() => {
    setIsLoading(true);
    if (params.userType === 'a') {
      setUser(JSON.parse(localStorage.getItem("bloodbankAdmin") as string));
    } else if (params.userType === 'r') {
      setUser(JSON.parse(localStorage.getItem("bloodbankRecorder") as string));
    }
    setIsLoading(false);
  }, [params.userType]);

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Profile</h1>
      </div>
      <div
        className="flex flex-1 p-4 border border-slate-200 rounded-lg shadow-sm"
      >
        {!isLoading && <UserAccountForm user={user} />}
        {isLoading && <LoadingSkeleton />}
      </div>
    </>
  )
}
