import {
    CircleUser,
    LineChart,
    Package,
    Package2,
    Settings,
    ShoppingCart,
    Users,
  } from "lucide-react"

const HospitalDashboardLinks = [
    {
        label: "Overview",
        to: "/dashboard",
        icon: <LineChart className="h-4 w-4" />,
    },
    {
        label: "Stock",
        to: "/dashboard/stock",
        icon: <Package className="h-4 w-4" />,
    },
    {
        label: "Blood Bags",
        to: "/dashboard/bags",
        icon: <Package2 className="h-4 w-4" />,
    },
    {
        label: "Requests",
        to: "/dashboard/requests",
        icon: <ShoppingCart className="h-4 w-4" />,
    },
    {
    label: "Users",
        to: "/dashboard/users",
        icon: <Users className="h-4 w-4" />,
    },
    {
        label: "Settings",
        to: "/dashboard/settings",
        icon: <Settings className="h-4 w-4" />,
    },
    {
        label: "Profile",
        to: "/dashboard/profile",
        icon: <CircleUser className="h-4 w-4" />,
    },
    
]

export default HospitalDashboardLinks;