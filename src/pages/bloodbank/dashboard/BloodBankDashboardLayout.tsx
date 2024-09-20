import {
  Bell,
  CircleUser,
  Menu,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Link, Outlet, useParams } from "react-router-dom"
import BloodBankDashboardLinks from "@/components/widgets/BloodBankDashboardLinks"
import { ModeToggle } from "@/components/mode-toggle"

export default function BloodBankDashboardLayout() {
  const params = useParams();

  const signOut = () => {
    if (params.userType === "a") {
      localStorage.removeItem("bloodbankAdmin")
      localStorage.removeItem("bloodbankAdminToken")
    } else {
      localStorage.removeItem("bloodbankRecorder")
      localStorage.removeItem("bloodbankRecorderToken")
    }
    window.location.replace("/bauth/signin");
  }

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link to={`/dashboard/${params.userType}`} className="flex items-center gap-2 font-semibold">
              <img src="/drc-flag.png" alt="logo" className="h-8 rounded-full w-auto sm:h-10" />
              <span className="">
                CPTS
              </span>
            </Link>
            <span className="ml-auto font-bold underline">
              {params.userType === "a" ? "Admin" : "Recorder"}
            </span>
          </div>
          <div className="flex-1">
            {

            }
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {BloodBankDashboardLinks.map((link, index) => {
                if (params.userType === 'a' && link.user === "Admin") {
                  return (
                    <Link key={index} to={link.to} className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                      {link.icon}
                      {link.label}
                    </Link>
                  )
                }
                if (params.userType === 'r' && link.user === "Recorder") {
                  return (
                    <Link key={index} to={link.to} className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                      {link.icon}
                      {link.label}
                    </Link>
                  )
                }
              })}
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 bg-[url(/cptsxc.png)] bg-no-repeat bg-cover">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link to={`/dashboard/${params.userType}`} className="flex items-center gap-2 font-semibold">
                  <img src="/drc-flag.png" alt="logo" className="h-8 rounded-full w-auto sm:h-10" />
                  <span className="">
                    EBSBS
                  </span>
                </Link>
                {BloodBankDashboardLinks.map((link, index) => {
                  if (params.userType === 'a' && link.user === "Admin") {
                    return (
                      <Link key={index} to={link.to} className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground">
                        {link.icon}
                        {link.label}
                      </Link>
                    )
                  }
                  if (params.userType === 'r' && link.user === "Recorder") {
                    return (
                      <Link key={index} to={link.to} className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground">
                        {link.icon}
                        {link.label}
                      </Link>
                    )
                  }
                })}
              </nav>
            </SheetContent>
          </Sheet>
          <div className="ml-auto flex gap-4">
            <ModeToggle />
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon" className="rounded-full">
                  <CircleUser className="h-5 w-5" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  <Link to={`/dashboard/${params.userType}profile`}>My Account</Link>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {params.userType === "a" && <DropdownMenuItem><Link to={`/dashboard/${params.userType}/settings`}>Settings</Link></DropdownMenuItem>}
                <DropdownMenuItem><Link to={`/dashboard/${params.userType}/profile`}>Profile</Link></DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
