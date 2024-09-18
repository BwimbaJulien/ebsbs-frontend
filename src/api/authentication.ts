import { HospitalApplicantSignUpTypes } from "@/components/forms/CreateHospitalAdminAccountForm";
import { SignInTypes } from "@/pages/bloodbank/auth/SignIn";
// import Cookies from "js-cookie";

const API_BASE_URL = import.meta.env.VITE_APP_BASE_URL;

export const SignUpForHospital = async (data: HospitalApplicantSignUpTypes) => {
    const response = await fetch(`${API_BASE_URL}/auth/hospital-sign-up`, {
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
export const BloodBankSignInRequest = async (data: SignInTypes) => {
    const response = await fetch(`${API_BASE_URL}/auth/bloodbank-sign-in`, {
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
export const HospitalSignInRequest = async (data: SignInTypes) => {
    const response = await fetch(`${API_BASE_URL}/auth/hospital-sign-in`, {
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

export const getUserWithHospitalId = async (hospitalId: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/findByHospitalId?hospitalId=${hospitalId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })

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

export const getBloodBankWorkers = async () => {
    const response = await fetch(`${API_BASE_URL}/auth/listBloodBankEmployees`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
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

export const getHospitalWorkers = async (hospitalId: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/listHospitalEmployees?hospitalId=${hospitalId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
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