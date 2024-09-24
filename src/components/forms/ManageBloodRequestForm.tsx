import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import LoadingButton from "../widgets/LoadingButton"
import { toast } from "sonner"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Separator } from "../ui/separator"
import { addRequest, updateRequest } from "@/api/request"
import { HospitalDataTypes } from "./HospitalSettingsForm"
import { BloodBankDataTypes } from "./SettingsForm"

const FormSchema = z.object({
  id: z.string().optional(),
  destination: z.string().optional(),
  hospitalId: z.string(),
  idOfOtherHospital: z.string().optional(),
  status: z.string().default('Pending'),
  rhP_O: z.number().default(0),
  rhP_A: z.number().default(0),
  rhP_B: z.number().default(0),
  rhP_AB: z.number().default(0),
  rhN_O: z.number().default(0),
  rhN_A: z.number().default(0),
  rhN_B: z.number().default(0),
  rhN_AB: z.number().default(0),
  plasmaRhP_O: z.number().default(0),
  plasmaRhP_A: z.number().default(0),
  plasmaRhP_B: z.number().default(0),
  plasmaRhP_AB: z.number().default(0),
  plasmaRhN_O: z.number().default(0),
  plasmaRhN_A: z.number().default(0),
  plasmaRhN_B: z.number().default(0),
  plasmaRhN_AB: z.number().default(0),
  plateletRhP_O: z.number().default(0),
  plateletRhP_A: z.number().default(0),
  plateletRhP_B: z.number().default(0),
  plateletRhP_AB: z.number().default(0),
  plateletRhN_O: z.number().default(0),
  plateletRhN_A: z.number().default(0),
  plateletRhN_B: z.number().default(0),
  plateletRhN_AB: z.number().default(0),
  rbcP_O: z.number().default(0),
  rbcP_A: z.number().default(0),
  rbcP_B: z.number().default(0),
  rbcP_AB: z.number().default(0),
  rbcN_O: z.number().default(0),
  rbcN_A: z.number().default(0),
  rbcN_B: z.number().default(0),
  rbcN_AB: z.number().default(0),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  bloodBankId: z.string().optional(),
});

export type RequestTypes = z.infer<typeof FormSchema>;

type Props = {
  request?: RequestTypes,
  hospitals: HospitalDataTypes[],
  bloodBanks: BloodBankDataTypes[]
}

export default function ManageBloodRequestForm({ request, hospitals, bloodBanks }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const hospitalId = JSON.parse(localStorage.getItem("hospitalWorker") as string).hospitalId;
  const navigate = useNavigate();
  const [destination, setDestination] = useState<"Blood Bank" | "Other Hospital" | undefined>(undefined);

  const form = useForm<RequestTypes>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id: request?.id || "",
      hospitalId: hospitalId,
      destination: request?.destination || "",
      idOfOtherHospital: request?.idOfOtherHospital || "",
      status: request?.status || 'Pending',
      rhP_O: request?.rhP_O || 0,
      rhP_A: request?.rhP_A || 0,
      rhP_B: request?.rhP_B || 0,
      rhP_AB: request?.rhP_AB || 0,
      rhN_O: request?.rhN_O || 0,
      rhN_A: request?.rhN_A || 0,
      rhN_B: request?.rhN_B || 0,
      rhN_AB: request?.rhN_AB || 0,
      plasmaRhP_O: request?.plasmaRhP_O || 0,
      plasmaRhP_A: request?.plasmaRhP_A || 0,
      plasmaRhP_B: request?.plasmaRhP_B || 0,
      plasmaRhP_AB: request?.plasmaRhP_AB || 0,
      plasmaRhN_O: request?.plasmaRhN_O || 0,
      plasmaRhN_A: request?.plasmaRhN_A || 0,
      plasmaRhN_B: request?.plasmaRhN_B || 0,
      plasmaRhN_AB: request?.plasmaRhN_AB || 0,
      plateletRhP_O: request?.plateletRhP_O || 0,
      plateletRhP_A: request?.plateletRhP_A || 0,
      plateletRhP_B: request?.plateletRhP_B || 0,
      plateletRhP_AB: request?.plateletRhP_AB || 0,
      plateletRhN_O: request?.plateletRhN_O || 0,
      plateletRhN_A: request?.plateletRhN_A || 0,
      plateletRhN_B: request?.plateletRhN_B || 0,
      plateletRhN_AB: request?.plateletRhN_AB || 0,
      rbcP_O: request?.rbcP_O || 0,
      rbcP_A: request?.rbcP_A || 0,
      rbcP_B: request?.rbcP_B || 0,
      rbcP_AB: request?.rbcP_AB || 0,
      rbcN_O: request?.rbcN_O || 0,
      rbcN_A: request?.rbcN_A || 0,
      rbcN_B: request?.rbcN_B || 0,
      rbcN_AB: request?.rbcN_AB || 0,
      bloodBankId: request?.bloodBankId || "",
    },
  })

  function onSubmit(data: RequestTypes) {
    setIsLoading(true);
    if (request?.id) {
      updateRequest(request.id, data)
        .then((response) => {
          toast.success(response.message);
          setIsLoading(false);
          navigate(`/hdashboard/${hospitalId}/r/requests/sent`)
        })
        .catch((error) => {
          setIsLoading(false);
          toast.error(error.message);
          console.log(error);
        })
    } else {
      addRequest(data)
        .then((response) => {
          form.reset();
          toast.success(response.message);
          setIsLoading(false);
          navigate(`/hdashboard/${hospitalId}/r/requests/sent`)
        })
        .catch((error) => {
          setIsLoading(false);
          toast.error(error.message);
          console.log(error);
        })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 md:space-y-0">
          <FormField
            control={form.control}
            name="destination"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Choose blood type</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Plasma" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Blood Bank
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Platelet" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Other Hospital
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Separator />
        <div className="flex mt-8 justify-between items-center w-full">
          {isLoading
            ? <LoadingButton label="Submitting..." btnClass={"w-fit"} btnVariant={"default"} />
            : <Button type="submit">{request?.id ? "Confirm changes" : "Submit"}</Button>
          }
        </div>
      </form>
    </Form>
  )
}
