import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "react-router-dom"

export default function BloodBankAdminOverviewContent() {
  return (
    <div className="grid auto-rows-max items-start gap-4 w-full lg:col-span-3">
      <div className="grid gap-4 sm:grid-cols-3 w-full md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-4">
        <Card x-chunk="dashboard-05-chunk-1">
          <CardHeader className="pb-2">
            <CardDescription>Applications from Hospitals</CardDescription>
            <CardTitle className="text-4xl">2</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              This month
            </div>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-05-chunk-2">
          <CardHeader className="pb-2">
            <CardDescription>Internal Users</CardDescription>
            <CardTitle className="text-4xl">1</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              This month
            </div>
          </CardContent>
        </Card>
        <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
          <CardHeader className="pb-3">
            <CardTitle>Manage Users</CardTitle>
            <CardDescription className="text-balance max-w-lg leading-relaxed">
              Add New Users to manage the blood bank
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button>
              <Link to="/dashboard/a/users">Add New User</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
