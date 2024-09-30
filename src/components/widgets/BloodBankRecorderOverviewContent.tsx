import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getBloodBankRecorderOverviewData } from "@/api/bloodBank";
import LoadingSkeleton from "./LoadingSkeleton";
import { RequestTypes } from "../forms/ManageBloodRequestForm";
import { BloodBagTypes } from "../forms/ManageBloodBagForm";

type FilterRangeTypes = {
  startDate: string | null;
  endDate: string | null;
}

export default function BloodBankRecorderOverviewContent() {
  const [isLoading, setIsLoading] = useState(false);
  const [allRequests, setAllRequests] = useState<RequestTypes[]>([]);
  const [pendingRequests, setPendingRequests] = useState<RequestTypes[]>();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [bloodBags, setBloodBags] = useState<BloodBagTypes[]>([]);
  const [filterYear, setFilterYear] = useState<number | null>(new Date().getFullYear());
  const [filterMonth, setFilterMonth] = useState<number | null>(new Date().getMonth());
  const [filterRange, setFilterRange] = useState<FilterRangeTypes>({
    startDate: "",
    endDate: "",
  });



  const bloodBankId = JSON.parse(localStorage.getItem("bloodbankRecorder") as string).bloodBankId;

  useEffect(() => {
    setIsLoading(true);
    getBloodBankRecorderOverviewData({
      bloodBankId,
      month: filterMonth,
      year: filterYear,
      startDate: filterRange.startDate,
      endDate: filterRange.endDate
    })
      .then((response) => {
        console.log(response);
        setAllRequests(response.requests);
        setPendingRequests(response.requests.filter((request: RequestTypes) => request.status === "Pending"));
        setBloodBags(response.bloodBags);
        setNotifications(response.notifications);
        // setFilterRange({
        //   startDate: response.filters.dateRangeStart,
        //   endDate: response.filter.dateRangeEnd,
        // });
        setFilterYear(response.filters.year);
        setFilterMonth(response.filters.month);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      })
  }, [bloodBankId, filterMonth, filterRange.endDate, filterRange.startDate, filterYear])

  if (isLoading) {
    return <LoadingSkeleton />
  }

  return (
    <div className="grid auto-rows-max items-start gap-4 w-full">
      <div className="grid gap-4 grid-cols-2 w-full md:grid-cols-4">
        <Card className="">
          <CardHeader className="pb-2">
            <CardDescription>All Received Requests</CardDescription>
            <CardTitle className="text-4xl">{allRequests?.length || 0}</CardTitle>
          </CardHeader>
          <CardContent>
            <Link className="text-sm text-primary hover:underline" to={'/dashboard/r/requests'}>View More</Link>
          </CardContent>
        </Card>
        <Card >
          <CardHeader className="pb-2">
            <CardDescription>Pending Requests</CardDescription>
            <CardTitle className="text-4xl">{pendingRequests?.length || 0}</CardTitle>
          </CardHeader>
          <CardContent>
            <Link className="text-sm text-primary hover:underline" to={'/dashboard/r/requests'}>View More</Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Blood Bags in Stock</CardDescription>
            <CardTitle className="text-4xl">{bloodBags?.length || 0}</CardTitle>
          </CardHeader>
          <CardContent>
            <Link className="text-sm text-primary hover:underline" to={'/dashboard/r/bags'}>View More</Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Notifications</CardDescription>
            <CardTitle className="text-4xl">{notifications?.length || 0}</CardTitle>
          </CardHeader>
          <CardContent>
            {/* <Link className="text-sm text-primary hover:underline" to={'/dashboard/a/notifications'}>View More</Link> */}
          </CardContent>
        </Card>
      </div>
      
    </div>
  )
}
