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
import { addNewUser } from "@/api/authentication"
import LoadingButton from "./LoadingButton"
import { toast } from "sonner"

const FormSchema = z.object({
    firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
    lastName: z.string().min(2, { message: "Last name must be at least 2 characters.", }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    phone: z.string().min(10, { message: "Phone number must be at least 10 characters." }),
    accountStatus: z.enum(["Active", "Inactive"], { message: "Please select an account status." }),
    id: z.string().optional(),
    role: z.enum(["Hospital Worker", "Blood Bank Recorder"]),
    bloodBankId: z.string(),
})

export type UserDataTypes = z.infer<typeof FormSchema>

export default function ManageUserForm({ user }: { user?: UserDataTypes }) {
    const [isLoading, setIsLoading] = useState(false);
    const bloodBankId = JSON.parse(localStorage.getItem("bloodbankAdmin") as string).bloodBankId;
    const navigate = useNavigate();

    const form = useForm<UserDataTypes>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            firstName: user?.firstName || "",
            lastName: user?.lastName || "",
            email: user?.email || "",
            phone: user?.phone || "",
            accountStatus: user?.accountStatus || "Active",
            id: user?.id || "",
            role: user?.role || "Blood Bank Recorder",
            bloodBankId: bloodBankId
        },
    })

    function onSubmit(data: UserDataTypes) {
        setIsLoading(true);
        addNewUser(data)
            .then((response) => {
                form.reset();
                toast.message(response.message);
                setIsLoading(false);
                navigate(`/dashboard/users`)
            })
            .catch((error) => {
                setIsLoading(false);
                toast.error(error.message);
                console.log(error);
            })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
                <div className="w-full flex flex-wrap space-y-4 items-start md:space-y-0 justify-between">
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem className="w-full md:w-[49%]">
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Your first name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem className="w-full md:w-[49%]">
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Your last name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="w-full flex flex-wrap space-y-4 md:space-y-0 items-start justify-between">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="w-full md:w-[49%]">
                                <FormLabel>Email address</FormLabel>
                                <FormControl>
                                    <Input placeholder="Your email address" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem className="w-full md:w-[49%]">
                                <FormLabel>Phone number</FormLabel>
                                <FormControl>
                                    <Input placeholder="Your phone number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                {isLoading
                    ? <LoadingButton label="Submitting..." btnClass={"w-fit"} btnVariant={"default"} />
                    : <Button type="submit">Submit</Button>
                }
            </form>
        </Form>
    )
}
