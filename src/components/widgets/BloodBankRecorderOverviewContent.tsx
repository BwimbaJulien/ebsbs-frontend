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
import { CalendarIcon } from "@radix-ui/react-icons"
import { addDays, format } from "date-fns"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


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
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  })
  const [filterMonth, setFilterMonth] = useState<number | null>(new Date().getMonth());
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

  const handleDateChange = (range: DateRange) => {
    setDate(range);
    setFilterRange({
      startDate: format(range.from, "yyyy-MM-dd"),
      endDate: format(range.to, "yyyy-MM-dd"),
    });
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
                  <SelectItem value="0">January</SelectItem>
                  <SelectItem value="1">February</SelectItem>
                  <SelectItem value="2">March</SelectItem>
                  <SelectItem value="3">April</SelectItem>
                  <SelectItem value="4">May</SelectItem>
                  <SelectItem value="5">June</SelectItem>
                  <SelectItem value="6">July</SelectItem>
                  <SelectItem value="7">August</SelectItem>
                  <SelectItem value="8">September</SelectItem>
                  <SelectItem value="9">October</SelectItem>
                  <SelectItem value="10">November</SelectItem>
                  <SelectItem value="11">December</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant={"outline"}
                  className={cn(
                    "w-[300px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, "LLL dd, y")} -{" "}
                        {format(date.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(date.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
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
                <SelectItem value="bags">Blood Bags</SelectItem>
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
            {/* <Link className="text-sm text-primary hover:underline" to={'/dashboard/a/notifications'}>View More</Link> */}
          </CardContent>
        </Card>
      </div>
      <RequestsLineChart />
    </div>
  )
}
