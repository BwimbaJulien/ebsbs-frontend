import { getHospitalById } from "@/api/hospital";
import HospitalDataForm, { HospitalDataTypes } from "@/components/forms/HospitalDataForm";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import LoadingSkeleton from "@/components/widgets/LoadingSkeleton";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function HospitalDetails() {
    const params = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [hospital, setHospital] = useState<HospitalDataTypes[]>([])

    useEffect(() => {
        setIsLoading(true);
        getHospitalById(params.hospitalId as string)
            .then((response) => {
                setHospital(response.hospitals);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setIsLoading(false);
            });
    }, [params.hospitalId]);

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
                        <BreadcrumbLink asChild>
                            <Link to={`/dashboard/${params.userType}/hospitals`}>Hospitals</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Details</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex items-center">
                <h1 className="text-lg font-semibold md:text-2xl">Hospitals Details</h1>
            </div>
            <div className="flex flex-1 p-4 border rounded-lg shadow-sm">
                {!isLoading && <HospitalDataForm hospital={hospital} />}
                {isLoading && <LoadingSkeleton />}
            </div>
        </>
    )
}
