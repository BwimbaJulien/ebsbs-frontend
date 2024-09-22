// import { RequestDataTypes } from "@/components/forms/SettingsForm";

// // import Cookies from "js-cookie";
// const API_BASE_URL = import.meta.env.VITE_APP_BASE_URL;

// export const getRequestById = async (id: string) => {
//     const response = await fetch(`${API_BASE_URL}/requests/findById?id=${id}`, {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json",
//         },
//     });
//     const responseData = await response.json();
//     if (!response.ok) {
//         if (responseData.errors) {
//             throw new Error(responseData.errors);
//         }
//         if (responseData.message) {
//             throw new Error(responseData.message);
//         }
//         if (responseData.error) { 
//             throw new Error(responseData.error);
//         }
//     }
//     return responseData;
// }

// type UpdateRequestResponseTypes = {
//     user: RequestDataTypes;
//     message: string;
//     error?: string;
// }

// export const updateRequest = async (id: string, data: RequestDataTypes) : Promise<UpdateRequestResponseTypes> => { 
//     const response = await fetch(`${API_BASE_URL}/requests/update?id=${id}`, {
//         method: "PUT",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//     });
//     const responseData = await response.json();
//     if (!response.ok) {
//         if (responseData.errors) {
//             throw new Error(responseData.errors);
//         }
//         if (responseData.message) {
//             throw new Error(responseData.message);
//         }
//         if (responseData.error) {
//             throw new Error(responseData.error);
//         }
//     }
//     return responseData;
// }