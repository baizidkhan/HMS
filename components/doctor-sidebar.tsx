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
  Users,
  FileText,
  Pill,
  Video,
  Activity,
  Settings,
  Stethoscope,
  LogOut,
} from "lucide-react"

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/doctor",
  },
  {
    title: "Appointments",
    icon: Calendar,
    href: "/doctor/appointments",
  },
  {
    title: "My Patients",
    icon: Users,
    href: "/doctor/patients",
  },
  {
    title: "Patient Notes",
    icon: FileText,
    href: "/doctor/notes",
  },
  {
    title: "Prescriptions",
    icon: Pill,
    href: "/doctor/prescriptions",
  },
  {
    title: "Telemedicine",
    icon: Video,
    href: "/doctor/telemedicine",
  },
  {
    title: "AI Assistant",
    icon: Activity,
    href: "/doctor/ai-assistant",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/doctor/settings",
  },
]

export function DoctorSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center space-x-2 px-2">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Stethoscope className="h-6 w-6 text-white" />
          </div>
          <div className="group-data-[collapsible=icon]:hidden">
            <h2 className="text-lg font-bold text-gray-900">Doctor Portal</h2>
            <p className="text-xs text-gray-600">Dr. James Wilson</p>
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
