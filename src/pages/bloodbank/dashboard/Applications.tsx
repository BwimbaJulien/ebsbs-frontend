import { getInactiveHospitals } from "@/api/hospital";
import { ApplicationsTable } from "@/components/tables/applicationTable/ApplicationsTable";
import LoadingSkeleton from "@/components/widgets/LoadingSkeleton";
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
    const [isLoading, setIsLoading] = useState(false);
    const [applications, setApplications] = useState<ApplicationsTypes[]>([]);

    useEffect(() => {
        setIsLoading(true);
        getInactiveHospitals()
            .then(response => {
                setIsLoading(false);
                setApplications(response.hospitals);
            })
            .catch(error => {
                console.error(error);
                setIsLoading(false);
            });
    }, []);

    return (
        <>
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold md:text-2xl">Overview</h1>
            </div>
            <div
                className="flex flex-1 p-4 border border-slate-200 rounded-lg shadow-sm"
            >
                {!isLoading && <ApplicationsTable applications={applications} />}
                {isLoading && <LoadingSkeleton />}
            </div>
        </>
    )
}
