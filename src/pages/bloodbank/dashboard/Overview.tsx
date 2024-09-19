import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Link, useParams } from "react-router-dom"

export default function Overview() {
  const params = useParams();
  return (
    <>
      <div className="flex flex-1 flex-col items-start space-y-4 w-full">
        <Breadcrumb className="hidden md:flex">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to={`/dashboard/${params.userType}`}>Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Overview</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="grid auto-rows-max items-start gap-4 w-full lg:col-span-3">
          <div className="grid gap-4 sm:grid-cols-3 w-full md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-4">
            <Card x-chunk="dashboard-05-chunk-1">
              <CardHeader className="pb-2">
                <CardDescription>This Week</CardDescription>
                <CardTitle className="text-4xl">$1,329</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  +25% from last week
                </div>
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-05-chunk-2">
              <CardHeader className="pb-2">
                <CardDescription>This Month</CardDescription>
                <CardTitle className="text-4xl">$5,329</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  +10% from last month
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
                <Button>Create New Order</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
