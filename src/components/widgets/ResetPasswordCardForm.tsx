import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export function ResetPasswordCardForm() {
    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Reset Password</CardTitle>
                <CardDescription>You will recieve an email to reset your password</CardDescription>
            </CardHeader>
            <CardContent>
                <form >
                    <Button type="submit" variant={"outline"}>Request Reset Link</Button>
                </form>
            </CardContent>
        </Card>
    )
}
