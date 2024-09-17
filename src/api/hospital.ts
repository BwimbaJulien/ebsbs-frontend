import { HospitalApplicantionTypes } from "@/components/forms/ApplyForHospitalForm";
// import Cookies from "js-cookie";

const API_BASE_URL = import.meta.env.VITE_APP_BASE_URL;

export const ApplyForHospital = async (data: HospitalApplicantionTypes) => {
    const response = await fetch(`${API_BASE_URL}/hospitals/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    const responseData = await response.json();
    if (!response.ok) {
        if (responseData.errors) {
            throw new Error(responseData.errors[0].message);
        }
        if (responseData.message) {
            throw new Error(responseData.message);
        }
        if (responseData.error) { 
            throw new Error(responseData.error);
        }
    }

    return responseData;
}