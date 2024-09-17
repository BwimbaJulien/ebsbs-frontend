import {
  Bell,
  CircleUser,
  Menu,
  Search,
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
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Link, Outlet } from "react-router-dom"
import BloodBankDashboardLinks from "@/components/widgets/BloodBankDashboardLinks"

export default function BloodBankDashboardLayout() {

  const signOut = () => {
    let userData = "";
    userData = localStorage.getItem('bloodbankAdmin') as string;
    if (!userData) {
      userData = localStorage.getItem('bloodbankRecorder') as string;
    }
    const user = JSON.parse(userData);

    if (user.role === "Blood Bank Admin") {
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
            <Link to="/dashboard" className="flex items-center gap-2 font-semibold">
              <img src="/drc-flag.png" alt="logo" className="h-8 rounded-full w-auto sm:h-10" />
              <span className="">
                EBSBS
              </span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {BloodBankDashboardLinks.map((link, index) => (<Link key={index}
                to={link.to}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                {link.icon}
                {link.label}
              </Link>))}
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
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
                <Link to="/dashboard" className="flex items-center gap-2 font-semibold">
                  <img src="/drc-flag.png" alt="logo" className="h-8 rounded-full w-auto sm:h-10" />
                  <span className="">
                    EBSBS
                  </span>
                </Link>
                {BloodBankDashboardLinks.map((link, index) => (<Link key={index}
                  to={link.to}
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  {link.icon}
                  {link.label}
                </Link>))}
              </nav>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
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
                <Link to={'/dashboard/profile'}>My Account</Link>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem><Link to={'/dashboard/settings'}>Settings</Link></DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
