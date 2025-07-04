"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import {
  LayoutDashboard,
  Users,
  UserCheck,
  Calendar,
  Building,
  Package,
  CreditCard,
  BarChart3,
  Settings,
  Shield,
  LogOut,
  TrendingUp,
} from "lucide-react"

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin",
  },
  {
    title: "Patients",
    icon: Users,
    href: "/admin/patients",
  },
  {
    title: "Patient Tracking",
    icon: TrendingUp,
    href: "/admin/patient-tracking",
  },
  {
    title: "Doctors",
    icon: UserCheck,
    href: "/admin/doctors",
  },
  {
    title: "Staff",
    icon: Users,
    href: "/admin/staff",
  },
  {
    title: "Appointments",
    icon: Calendar,
    href: "/admin/appointments",
  },
  {
    title: "Departments",
    icon: Building,
    href: "/admin/departments",
  },
  {
    title: "Inventory",
    icon: Package,
    href: "/admin/inventory",
  },
  {
    title: "Billing",
    icon: CreditCard,
    href: "/admin/billing",
  },
  {
    title: "Reports",
    icon: BarChart3,
    href: "/admin/reports",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/admin/settings",
  },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center space-x-2 px-2">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <div className="group-data-[collapsible=icon]:hidden">
            <h2 className="text-lg font-bold text-gray-900">Admin Panel</h2>
            <p className="text-xs text-gray-600">Hospital Management</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className={cn(pathname === item.href && "bg-blue-50 text-blue-700")}>
                    <Link href={item.href} className="flex items-center space-x-2">
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      <span className="truncate">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="p-2">
          <Link href="/">
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <LogOut className="h-4 w-4 mr-2 flex-shrink-0" />
              <span className="group-data-[collapsible=icon]:hidden truncate">Logout</span>
            </Button>
          </Link>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
