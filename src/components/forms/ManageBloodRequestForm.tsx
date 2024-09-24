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
import { Separator } from "../ui/separator"
import { addRequest, updateRequest } from "@/api/request"
import { HospitalDataTypes } from "./HospitalSettingsForm"
import { BloodBankDataTypes } from "./SettingsForm"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

const FormSchema = z.object({
  id: z.string().optional(),
  hospitalId: z.string(),
  idOfOtherHospital: z.string().optional(),
  status: z.string().default('Pending'),
  rhP_O: z.string().default("0"),
  rhP_A: z.string().default("0"),
  rhP_B: z.string().default("0"),
  rhP_AB: z.string().default("0"),
  rhN_O: z.string().default("0"),
  rhN_A: z.string().default("0"),
  rhN_B: z.string().default("0"),
  rhN_AB: z.string().default("0"),
  plasmaRhP_O: z.string().default("0"),
  plasmaRhP_A: z.string().default("0"),
  plasmaRhP_B: z.string().default("0"),
  plasmaRhP_AB: z.string().default("0"),
  plasmaRhN_O: z.string().default("0"),
  plasmaRhN_A: z.string().default("0"),
  plasmaRhN_B: z.string().default("0"),
  plasmaRhN_AB: z.string().default("0"),
  plateletRhP_O: z.string().default("0"),
  plateletRhP_A: z.string().default("0"),
  plateletRhP_B: z.string().default("0"),
  plateletRhP_AB: z.string().default("0"),
  plateletRhN_O: z.string().default("0"),
  plateletRhN_A: z.string().default("0"),
  plateletRhN_B: z.string().default("0"),
  plateletRhN_AB: z.string().default("0"),
  rbcP_O: z.string().default("0"),
  rbcP_A: z.string().default("0"),
  rbcP_B: z.string().default("0"),
  rbcP_AB: z.string().default("0"),
  rbcN_O: z.string().default("0"),
  rbcN_A: z.string().default("0"),
  rbcN_B: z.string().default("0"),
  rbcN_AB: z.string().default("0"),
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

  const form = useForm<RequestTypes>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id: request?.id || "",
      hospitalId: hospitalId,
      idOfOtherHospital: request?.idOfOtherHospital || "",
      status: request?.status || 'Pending',
      rhP_O: request?.rhP_O || "0",
      rhP_A: request?.rhP_A || "0",
      rhP_B: request?.rhP_B || "0",
      rhP_AB: request?.rhP_AB || "0",
      rhN_O: request?.rhN_O || "0",
      rhN_A: request?.rhN_A || "0",
      rhN_B: request?.rhN_B || "0",
      rhN_AB: request?.rhN_AB || "0",
      plasmaRhP_O: request?.plasmaRhP_O || "0",
      plasmaRhP_A: request?.plasmaRhP_A || "0",
      plasmaRhP_B: request?.plasmaRhP_B || "0",
      plasmaRhP_AB: request?.plasmaRhP_AB || "0",
      plasmaRhN_O: request?.plasmaRhN_O || "0",
      plasmaRhN_A: request?.plasmaRhN_A || "0",
      plasmaRhN_B: request?.plasmaRhN_B || "0",
      plasmaRhN_AB: request?.plasmaRhN_AB || "0",
      plateletRhP_O: request?.plateletRhP_O || "0",
      plateletRhP_A: request?.plateletRhP_A || "0",
      plateletRhP_B: request?.plateletRhP_B || "0",
      plateletRhP_AB: request?.plateletRhP_AB || "0",
      plateletRhN_O: request?.plateletRhN_O || "0",
      plateletRhN_A: request?.plateletRhN_A || "0",
      plateletRhN_B: request?.plateletRhN_B || "0",
      plateletRhN_AB: request?.plateletRhN_AB || "0",
      rbcP_O: request?.rbcP_O || "0",
      rbcP_A: request?.rbcP_A || "0",
      rbcP_B: request?.rbcP_B || "0",
      rbcP_AB: request?.rbcP_AB || "0",
      rbcN_O: request?.rbcN_O || "0",
      rbcN_A: request?.rbcN_A || "0",
      rbcN_B: request?.rbcN_B || "0",
      rbcN_AB: request?.rbcN_AB || "0",
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
      console.log(data);
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
        <span>Choose Request Recipient</span>
        <Tabs defaultValue="account" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="bloodBank">Blood Bank</TabsTrigger>
            <TabsTrigger value="otherHospital">Other Hospital</TabsTrigger>
          </TabsList>
          <TabsContent value="bloodBank">
            <FormField
              control={form.control}
              name="bloodBankId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recipient</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a blood bank" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {bloodBanks.map((bloodBank) => (
                        <SelectItem key={bloodBank.id} value={bloodBank.id}>{bloodBank.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>
          <TabsContent value="otherHospital">
            <FormField
              control={form.control}
              name="idOfOtherHospital"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recipient</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a hospital to send the request" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {hospitals.map((hospital) => {
                        if (hospital.id === hospitalId) return null;
                        return (
                          <SelectItem key={hospital.id} value={hospital.id}>{hospital.name}</SelectItem>
                        )
                      })}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>
        </Tabs>
        <Separator />
        <div className="w-full flex flex-col space-y-2">
          <span className="font-bold">Whole Blood</span>
          <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-4 md:space-y-0">
            <FormField
              control={form.control}
              name="rhP_O"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Group O +</FormLabel>
                  <FormControl>
                    <Input type="string" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rhP_A"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Group A +</FormLabel>
                  <FormControl>
                    <Input type="string" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rhP_B"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Group B +</FormLabel>
                  <FormControl>
                    <Input type="string" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rhP_AB"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Group AB +</FormLabel>
                  <FormControl>
                    <Input type="string" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-4 md:space-y-0">
            <FormField
              control={form.control}
              name="rhN_O"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Group O -</FormLabel>
                  <FormControl>
                    <Input type="string" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rhN_A"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Group A -</FormLabel>
                  <FormControl>
                    <Input type="string" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rhN_B"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Group B -</FormLabel>
                  <FormControl>
                    <Input type="string" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rhN_AB"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Group AB -</FormLabel>
                  <FormControl>
                    <Input type="string" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Separator />
        <div className="w-full flex flex-col space-y-2">
          <span className="font-bold">Plasma</span>
          <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-4 md:space-y-0">
            <FormField
              control={form.control}
              name="plasmaRhP_O"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Group O +</FormLabel>
                  <FormControl>
                    <Input type="string" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="plasmaRhP_A"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Group A +</FormLabel>
                  <FormControl>
                    <Input type="string" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="plasmaRhP_B"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Group B +</FormLabel>
                  <FormControl>
                    <Input type="string" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="plasmaRhP_AB"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Group AB +</FormLabel>
                  <FormControl>
                    <Input type="string" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-4 md:space-y-0">
            <FormField
              control={form.control}
              name="plasmaRhN_O"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Group O -</FormLabel>
                  <FormControl>
                    <Input type="string" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="plasmaRhN_A"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Group A -</FormLabel>
                  <FormControl>
                    <Input type="string" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="plasmaRhN_B"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Group B -</FormLabel>
                  <FormControl>
                    <Input type="string" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="plasmaRhN_AB"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Group AB -</FormLabel>
                  <FormControl>
                    <Input type="string" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Separator />
        <div className="w-full flex flex-col space-y-2">
          <span className="font-bold">Platelets</span>
          <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-4 md:space-y-0">
            <FormField
              control={form.control}
              name="plateletRhP_O"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Group O +</FormLabel>
                  <FormControl>
                    <Input type="string" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="plateletRhP_A"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Group A +</FormLabel>
                  <FormControl>
                    <Input type="string" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="plateletRhP_B"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Group B +</FormLabel>
                  <FormControl>
                    <Input type="string" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="plateletRhP_AB"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Group AB +</FormLabel>
                  <FormControl>
                    <Input type="string" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-4 md:space-y-0">
            <FormField
              control={form.control}
              name="plateletRhN_O"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Group O -</FormLabel>
                  <FormControl>
                    <Input type="string" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="plateletRhN_A"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Group A -</FormLabel>
                  <FormControl>
                    <Input type="string" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="plateletRhN_B"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Group B -</FormLabel>
                  <FormControl>
                    <Input type="string" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="plateletRhN_AB"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Group AB -</FormLabel>
                  <FormControl>
                    <Input type="string" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Separator />
        <div className="w-full flex flex-col space-y-2">
          <span className="font-bold">Red Blood Cells</span>
          <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-4 md:space-y-0">
            <FormField
              control={form.control}
              name="rbcP_O"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Group O +</FormLabel>
                  <FormControl>
                    <Input type="string" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rbcP_A"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Group A +</FormLabel>
                  <FormControl>
                    <Input type="string" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rbcP_B"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Group B +</FormLabel>
                  <FormControl>
                    <Input type="string" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rbcP_AB"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Group AB +</FormLabel>
                  <FormControl>
                    <Input type="string" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-4 md:space-y-0">
            <FormField
              control={form.control}
              name="rbcN_O"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Group O -</FormLabel>
                  <FormControl>
                    <Input type="string" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rbcN_A"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Group A -</FormLabel>
                  <FormControl>
                    <Input type="string" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rbcN_B"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Group B -</FormLabel>
                  <FormControl>
                    <Input type="string" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rbcN_AB"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Group AB -</FormLabel>
                  <FormControl>
                    <Input type="string" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
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
