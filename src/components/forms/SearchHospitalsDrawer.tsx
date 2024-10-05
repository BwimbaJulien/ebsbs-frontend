import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Search } from "lucide-react"
import { useState } from "react"
import { z } from "zod"
import { HospitalDataTypes } from "./HospitalSettingsForm"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { searchHospitalsByBlood } from "@/api/hospital"
import { toast } from "sonner"
import { Separator } from "../ui/separator"
import LoadingButton from "../widgets/LoadingButton"

const FormSchema = z.object({
    bloodType: z.enum(["Plasma", "Platelet", "Whole Blood", "Red Blood Cells"]),
    bloodGroup: z.enum(["A", "B", "AB", "O"]),
    rhesis: z.enum(["P", "N"])
});

export type SearchHospitalsTypes = z.infer<typeof FormSchema>;

export default function SearchHospitalsDrawer() {
    const [isLoading, setIsLoading] = useState(false);
    const [hospitals, setHospitals] = useState<HospitalDataTypes[]>([]);
    const hospitalId = JSON.parse(localStorage.getItem("hospitalWorker") as string).hospitalId;

    const form = useForm<SearchHospitalsTypes>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            bloodGroup: "A",
            bloodType: "Whole Blood",
            rhesis: "P",
        },
    })

    function onSubmit(data: SearchHospitalsTypes) {
        setIsLoading(true);

        searchHospitalsByBlood(data)
            .then((response) => {
                setIsLoading(false);
                setHospitals(response.hospitals);
            })
            .catch((error) => {
                setIsLoading(false);
                toast.error(error.message);
                console.log(error);
            })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="icon" className="h-8 w-8">
                    <Search className="h-4 w-4" />
                    <span className="sr-only">Toggle search</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="w-full">
                <DialogHeader>
                    <DialogTitle>Search Hospitals</DialogTitle>
                    <DialogDescription>
                        Search hospitals with required blood.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
                        <div className="w-full">
                            <FormField
                                control={form.control}
                                name="bloodType"
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
                                                        Plasma
                                                    </FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="Platelet" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        Platelet
                                                    </FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="Whole Blood" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        Whole Blood
                                                    </FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="Red Blood Cells" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        Red Blood Cells
                                                    </FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 md:space-y-0 items-start justify-between">
                            <FormField
                                control={form.control}
                                name="bloodGroup"
                                render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <FormLabel>Choose blood group</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                className="flex space-y-1"
                                            >
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="A" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        A
                                                    </FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="B" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        B
                                                    </FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="AB" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        AB
                                                    </FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="O" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        O
                                                    </FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="rhesis"
                                render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <FormLabel>Choose Rhesis</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                className="flex space-y-1"
                                            >
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="P" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        Positive
                                                    </FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="N" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        Negative
                                                    </FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex mt-8 justify-between items-center w-full">
                            {isLoading
                                ? <LoadingButton label="Searching..." btnClass={"w-fit"} btnVariant={"default"} />
                                : <Button type="submit">Search</Button>
                            }
                        </div>
                    </form>
                </Form>
                <DialogFooter>
                    <div className="flex flex-col w-full space-y-2">
                        {(hospitals && hospitals.length !== 0) && <Separator />}
                        {(hospitals && hospitals.length > 0) && <p className="font-bold">Search Results</p>}
                        {hospitals.length !== 0 && <div className="flex bg-secondary flex-col w-full gap-2 border p-2 rounded-md">
                            {hospitals.map((hospital) => {
                                if (!hospital || !hospital.name) return null;
                                if (hospital.id === hospitalId) return null;
                                return (
                                    <div key={hospital.id} className="flex w-full justify-between">
                                        <p>
                                            <span className="text-sm">{hospital.name}</span>
                                        </p>
                                        <p>
                                            <span className="text-sm p-1 bg-secondary border rounded-md">Hospital</span>
                                        </p>
                                        <Button
                                            variant={"outline"}
                                            className="w-fit"
                                            size={"sm"}
                                            onClick={() => window.location.replace(`/hdash/${hospitalId}/r/requests/sent/new?hospital=${hospital.id}`)}>
                                            Create Request
                                        </Button>
                                    </div>
                                )
                            })}
                            <div className="flex w-full justify-between">
                                <p>
                                    <span className="text-sm font-bold">Blood Bank</span>
                                </p>
                                <p>

                                </p>
                                <Button
                                    variant={"outline"}
                                    className="w-fit"
                                    size={"sm"}
                                    onClick={() => window.location.replace(`/hdash/${hospitalId}/r/requests/sent/new`)}>
                                    Create Request
                                </Button>
                            </div>
                        </div>}
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
