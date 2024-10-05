import {
    CircleUser,
    LineChart,
    MailCheck,
    MailPlus,
    Package,
    // Package2,
    Settings,
    Users,
  } from "lucide-react"

const HospitalDashboardLinks = [
    {
        hospitalId: "",
        label: "Overview",
        destination: '',
        to: '',
        user: "Worker",
        icon: <LineChart className="h-4 w-4" />,
    },
    {
        hospitalId: "",
        label: "Overview",
        destination: '',
        to: "overview",
        user: "Admin",
        icon: <LineChart className="h-4 w-4" />,
    },
    {
        hospitalId: "",
        label: "Stock",
        destination: '',
        to: "stock",
        user: "Admin",
        icon: <Package className="h-4 w-4" />,
    },
    {
        hospitalId: "",
        label: "Stock",
        destination: '',
        to: "stock",
        user: "Worker",
        icon: <Package className="h-4 w-4" />,
    },
    // {
    //     hospitalId: "",
    //     label: "Blood Bags",
    //     destination: '',
    //     to: "bags",
    //     user: "Worker",
    //     icon: <Package2 className="h-4 w-4" />,
    // },
    {
        hospitalId: "",
        label: "Sent Requests",
        destination: '',
        to: "requests/sent",
        user: "Worker",
        icon: <MailCheck className="h-4 w-4" />,
    },
    {
        hospitalId: "",
        label: "Incoming Requests",
        destination: '',
        to: "requests/incoming",
        user: "Worker",
        icon: <MailPlus className="h-4 w-4" />,
    },
    {
        hospitalId: "",
        label: "Pharmacists",
        destination: '',
        to: "users",
        user: "Admin",
        icon: <Users className="h-4 w-4" />,
    },
    {
        hospitalId: "",
        label: "Settings",
        destination: '',
        to: "settings",
        user: "Admin",
        icon: <Settings className="h-4 w-4" />,
    },
    {
        hospitalId: "",
        label: "Profile",
        destination: '',
        to: "profile",
        user: "Admin",
        icon: <CircleUser className="h-4 w-4" />,
    },
    {
        hospitalId: "",
        label: "Profile",
        destination: '',
        to: "profile",
        user: "Worker",
        icon: <CircleUser className="h-4 w-4" />,
    },
]

export default HospitalDashboardLinks;