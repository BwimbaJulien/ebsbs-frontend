import LoadingSkeleton from "@/components/widgets/LoadingSkeleton";
import { UserDataTypes } from "@/components/widgets/ManageUserForm";
import UserAccountForm from "@/components/widgets/UserAccountForm";
import { useEffect, useState } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ResetPasswordCardForm } from "@/components/widgets/ResetPasswordCardForm";

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
      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={`/dashboard/${params.userType}`}>Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Profile</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Profile</h1>
      </div>
      <div
        className="flex flex-1 p-4 border rounded-lg shadow-sm"
      >
        {!isLoading && <UserAccountForm user={user} />}
        {isLoading && <LoadingSkeleton />}
      </div>
      <ResetPasswordCardForm />
    </>
  )
}
