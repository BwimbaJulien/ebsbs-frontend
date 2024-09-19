import { getBloodBankById } from "@/api/bloodBank";
import LoadingSkeleton from "@/components/widgets/LoadingSkeleton";
import SettingsForm, { BloodBankDataTypes } from "@/components/widgets/SettingsForm";
import { useEffect, useState } from "react";

export default function Settings() {
  const [isLoading, setIsLoading] = useState(false);
  const bloodBankId = JSON.parse(localStorage.getItem("bloodbankAdmin") as string).bloodBankId;
  const [bloodBank, setBloodBank] = useState<BloodBankDataTypes>();

  useEffect(() => {
    setIsLoading(true);
    getBloodBankById(bloodBankId)
      .then(response => {
        console.log(response);
        setBloodBank(response.bloodBank);
        setIsLoading(false);
      })
  }, [bloodBankId])

  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Settings</h1>
      </div>
      <div
        className="flex flex-1 p-4 border border-slate-200 rounded-lg shadow-sm"
      >
        <div
          className="flex flex-1"
        >
          {isLoading && <LoadingSkeleton />}
          {!isLoading && <SettingsForm bloodBank={bloodBank} />}
        </div>
      </div>
    </>
  )
}
