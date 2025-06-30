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
  Calendar,
  UserPlus,
  Users,
  CreditCard,
  Phone,
  FileText,
  Settings,
  Heart,
  LogOut,
} from "lucide-react"

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/receptionist",
  },
  {
    title: "Appointments",
    icon: Calendar,
    href: "/receptionist/appointments",
  },
  {
    title: "Patient Registration",
    icon: UserPlus,
    href: "/receptionist/registration",
  },
  {
    title: "Patient Directory",
    icon: Users,
    href: "/receptionist/patients",
  },
  {
    title: "Billing & Payments",
    icon: CreditCard,
    href: "/receptionist/billing",
  },
  {
    title: "Phone Directory",
    icon: Phone,
    href: "/receptionist/directory",
  },
  {
    title: "Reports",
    icon: FileText,
    href: "/receptionist/reports",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/receptionist/settings",
  },
]

export function ReceptionistSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center space-x-2 px-2">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Heart className="h-6 w-6 text-white" />
          </div>
          <div className="group-data-[collapsible=icon]:hidden">
            <h2 className="text-lg font-bold text-gray-900">Reception Desk</h2>
            <p className="text-xs text-gray-600">Front Office</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className={cn(pathname === item.href && "bg-blue-50 text-blue-700")}>
                    <Link href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
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
              <LogOut className="h-4 w-4 mr-2" />
              <span className="group-data-[collapsible=icon]:hidden">Logout</span>
            </Button>
          </Link>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
