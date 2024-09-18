import { getInactiveHospitals } from "@/api/hospital";
import { ApplicationsTable } from "@/components/tables/applicationTable/ApplicationsTable";
import { useEffect, useState } from "react";

export type ApplicationsTypes = {
    name: string;
    province: string;
    town: string;
    id: string;
    hospitalType: "Public" | "Private";
    specialization: string;
    accessStatus: "Active" | "Inactive";
    createdAt: Date
}

export default function Applications() {
    const [applications, setApplications] = useState<ApplicationsTypes[]>([]);

    useEffect(() => {
        getInactiveHospitals()
            .then(response => {
                setApplications(response.hospitals);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <>
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold md:text-2xl">Overview</h1>
            </div>
            {/* <Separator /> */}
            <div
                className="flex flex-1 p-4 border border-slate-200 rounded-lg shadow-sm"
            >
                <ApplicationsTable applications={applications} />
            </div>
        </>
    )
}
