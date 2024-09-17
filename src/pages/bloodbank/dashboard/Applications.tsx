import ApplicationsTable from "@/components/tables/ApplicationsTable";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

export default function Applications() {
  const { applicants, setApplicants } = useState([]);

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Overview</h1>
      </div>
      <Separator />
      <div
        className="flex flex-1"
      >
        <ApplicationsTable />
      </div>
    </>
  )
}
