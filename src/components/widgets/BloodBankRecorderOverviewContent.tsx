import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getBloodBankRecorderOverviewData } from "@/api/bloodBank";
import LoadingSkeleton from "./LoadingSkeleton";
import { RequestTypes } from "../forms/ManageBloodRequestForm";
import { BloodBagTypes } from "../forms/ManageBloodBagForm";
import RequestsLineChart from "./RequestsLineChart";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
// import { CalendarIcon } from "@radix-ui/react-icons"
// import { addDays } from "date-fns"
// import { DateRange } from "react-day-picker"

// import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button"
// import { Calendar } from "@/components/ui/calendar"
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover"


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
  const [chartData, setChartData] = useState([]);
  const [filterYear, setFilterYear] = useState<number>(new Date().getFullYear());
  const [filterMonth, setFilterMonth] = useState<number>(new Date().getMonth());

  const [filterRange, setFilterRange] = useState<FilterRangeTypes>({
    startDate: "",
    endDate: "",
  });

  const handleMonthChange = (month: number) => {
    console.log(month);
    setFilterMonth(month);
  };

  const handleYearChange = (year: number) => {
    console.log(year);
    setFilterYear(year);
  };

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
        setFilterYear(response.filters.year);
        setFilterMonth(response.filters.month);
        setChartData(response.chartData);
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
      <div className="flex justify-start md:justify-end items-center gap-4 w-full flex-wrap">
        <div className="flex justify-end items-center gap-3">
          <span className="font-semibold text-sm">Filter</span>
          <div className="flex items-end gap-2">
            <Select name="filterYear" onValueChange={(value) => handleYearChange(parseInt(value))}>
              <SelectTrigger className="w-fit">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Year</SelectLabel>
                  <SelectItem value={new Date().getFullYear().toString()}>{new Date().getFullYear()}</SelectItem>
                  <SelectItem value={(new Date().getFullYear() - 1).toString()}>{new Date().getFullYear() - 1}</SelectItem>
                  <SelectItem value={(new Date().getFullYear() - 2).toString()}>{new Date().getFullYear() - 2}</SelectItem>
                  <SelectItem value={(new Date().getFullYear() - 3).toString()}>{new Date().getFullYear() - 3}</SelectItem>
                  <SelectItem value={(new Date().getFullYear() - 4).toString()}>{new Date().getFullYear() - 4}</SelectItem>
                  <SelectItem value={(new Date().getFullYear() - 5).toString()}>{new Date().getFullYear() - 5}</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select name="filterMonth" onValueChange={(value) => handleMonthChange(parseInt(value))}>
              <SelectTrigger className="w-fit">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Months</SelectLabel>
                  <SelectItem value="1">January</SelectItem>
                  <SelectItem value="2">February</SelectItem>
                  <SelectItem value="3">March</SelectItem>
                  <SelectItem value="4">April</SelectItem>
                  <SelectItem value="5">May</SelectItem>
                  <SelectItem value="6">June</SelectItem>
                  <SelectItem value="7">July</SelectItem>
                  <SelectItem value="8">August</SelectItem>
                  <SelectItem value="9">September</SelectItem>
                  <SelectItem value="10">October</SelectItem>
                  <SelectItem value="11">November</SelectItem>
                  <SelectItem value="12">December</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end gap-2">
          </div>
        </div>
        <div className="flex justify-end items-center gap-2">
          <span className="font-semibold text-sm">Reports</span>
          <Select>
            <SelectTrigger className="w-fit">
              <SelectValue placeholder="Choose Report" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="stock">Stock</SelectItem>
                <SelectItem value="requests">Requests</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

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
          </CardContent>
        </Card>
      </div>
      <RequestsLineChart data={chartData} filterMonth={filterMonth} filterYear={filterYear} />
    </div>
  )
}