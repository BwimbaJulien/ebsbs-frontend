import { getUserWithHospitalId } from "@/api/authentication";
import { getHospitalById } from "@/api/hospital";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type ApplicationDetailsTypes = {
    name: string;
    province: string;
    town: string;
    id: string;
    hospitalType: "Public" | "Private";
    googleLocation: string;
    specialization: string;
    accountStatus: "Active" | "Inactive";
    createdAt: Date;
}

type ApplicantDataTypes = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    accountStatus: "Active" | "Inactive";
    createdAt: Date;
}

export default function ApplicationDetails() {
    const params = useParams();
    const [applicant, setApplicant] = useState<ApplicantDataTypes>({
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        accountStatus: "Inactive",
        createdAt: new Date(),
    });
    const [application, setApplication] = useState<ApplicationDetailsTypes>({
        name: "",
        province: "",
        town: "",
        id: "",
        hospitalType: "Public",
        googleLocation: "",
        specialization: "",
        accountStatus: "Active",
        createdAt: new Date(),
    });

    useEffect(() => {
        getHospitalById(params.id as string)
            .then(response => {
                setApplication(response.hospital);
            })
            .catch(error => {
                console.error(error);
            });

        getUserWithHospitalId(params.id as string)
            .then(response => {
                console.log(response);
                setApplicant(response.hospitalAdmin);
            })
            .catch(error => {
                console.error(error);
            });
    }, [params.id]);

    return (
        <>
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold md:text-2xl">Application No: {params.id}</h1>
            </div>
            <div className="flex w-full gap-4 flex-wrap justify-between items-start">
                <div
                    className="flex w-full flex-wrap md:w-[60%] justify-between items-start p-4 border border-slate-200 rounded-lg shadow-sm"
                >
                    <h2 className="text-lg font-semibold w-full pb-4 border-b">Hospital: <span className="text-primary">{application?.name}</span></h2>
                    <table className="w-full">
                        <tbody>
                            <tr className="">
                                <th className="text-left py-2 font-semibold">Province</th>
                                <td>{application?.province}</td>
                            </tr>
                            <tr className="">
                                <th className="text-left py-2 font-semibold">Town</th>
                                <td>{application?.town}</td>
                            </tr>
                            <tr className="">
                                <th className="text-left py-2 font-semibold">Type</th>
                                <td>{application?.hospitalType}</td>
                            </tr>
                            <tr className="">
                                <th className="text-left py-2 font-semibold">Specialization</th>
                                <td>{application?.specialization}</td>
                            </tr>
                            <tr className="">
                                <th className="text-left py-2 font-semibold">Access Status</th>
                                <td className="capitalize">
                                    {application?.accountStatus === "Active"
                                        ? <Badge variant={"default"}>Active</Badge>
                                        : <Badge variant={"destructive"}>Inactive</Badge>
                                    }
                                </td>
                            </tr>
                            <tr className="">
                                <th className="text-left py-4 font-semibold">Application Date</th>
                                <td>{new Date(application?.createdAt).toDateString()}</td>
                            </tr>
                        </tbody>
                    </table>

                </div>
                <div
                    className="flex w-full md:w-[38%] flex-col justify-start items-start flex-1 p-4 border border-slate-200 rounded-lg shadow-sm"
                >
                    <div className="flex gap-4 flex-col">
                        <img src="https://e7.pngegg.com/pngimages/81/570/png-clipart-profile-logo-computer-icons-user-user-blue-heroes-thumbnail.png" alt="logo" className="sm:h-16 sm:w-16 h-32 w-32 rounded-full" />
                        <div>
                            <strong>Applicant</strong>
                            <p>{applicant.firstName + " " + applicant.lastName}</p>
                        </div>
                        <table className="w-full">
                            <tbody>
                                <tr className="">
                                    <th className="text-left py-2 font-semibold">Phone number</th>
                                    <td>{applicant?.phone}</td>
                                </tr>
                                <tr className="">
                                    <th className="text-left py-2 font-semibold">Email</th>
                                    <td>{applicant?.email}</td>
                                </tr>
                                <tr className="">
                                    <th className="text-left py-2 font-semibold">Access Status</th>
                                    <td className="capitalize">
                                        {applicant.accountStatus === "Active"
                                            ? <Badge variant={"secondary"}>Active</Badge>
                                            : <Badge variant={"destructive"}>Inactive</Badge>
                                        }
                                    </td>
                                </tr>
                                <tr className="">
                                    <th className="text-left py-4 font-semibold">Join Date</th>
                                    <td>{new Date(applicant.createdAt).toDateString()}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}