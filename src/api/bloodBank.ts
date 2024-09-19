import { BloodBankDataTypes } from "@/components/widgets/SettingsForm";

// import Cookies from "js-cookie";
const API_BASE_URL = import.meta.env.VITE_APP_BASE_URL;

export const getBloodBankById = async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/bloodBanks/findById?id=${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
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

type UpdateBloodBankResponseTypes = {
    user: BloodBankDataTypes;
    message: string;
    error?: string;
}

export const updateBloodBank = async (id: string, data: BloodBankDataTypes) : Promise<UpdateBloodBankResponseTypes> => { 
    const response = await fetch(`${API_BASE_URL}/bloodBanks/update?id=${id}`, {
        method: "PUT",
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