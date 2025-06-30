"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  UserCheck,
  Calendar,
  CreditCard,
  TrendingUp,
  TrendingDown,
  Activity,
  AlertCircle,
  CheckCircle,
  Search,
  Bell,
  Settings,
  Plus,
} from "lucide-react"
import Link from "next/link"

// Mock data
const dashboardStats = [
  {
    title: "Total Patients",
    value: "2,847",
    change: "+12%",
    trend: "up",
    icon: Users,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    title: "Active Doctors",
    value: "47",
    change: "+2",
    trend: "up",
    icon: UserCheck,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    title: "Today's Appointments",
    value: "156",
    change: "-8%",
    trend: "down",
    icon: Calendar,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    title: "Monthly Revenue",
    value: "$284,750",
    change: "+18%",
    trend: "up",
    icon: CreditCard,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
]

const recentPatients = [
  {
    id: "P001",
    name: "John Smith",
    age: 45,
    condition: "Hypertension",
    doctor: "Dr. Wilson",
    status: "Active",
    lastVisit: "2024-01-15",
    avatar: "JS",
  },
  {
    id: "P002",
    name: "Sarah Johnson",
    age: 32,
    condition: "Diabetes",
    doctor: "Dr. Brown",
    status: "Monitoring",
    lastVisit: "2024-01-14",
    avatar: "SJ",
  },
  {
    id: "P003",
    name: "Mike Davis",
    age: 28,
    condition: "Fracture Recovery",
    doctor: "Dr. Lee",
    status: "Recovering",
    lastVisit: "2024-01-13",
    avatar: "MD",
  },
  {
    id: "P004",
    name: "Emily Wilson",
    age: 55,
    condition: "Cardiac Check",
    doctor: "Dr. Smith",
    status: "Scheduled",
    lastVisit: "2024-01-12",
    avatar: "EW",
  },
]

const systemAlerts = [
  {
    type: "warning",
    title: "Server Maintenance",
    message: "Scheduled maintenance tonight at 2:00 AM",
    time: "2 hours ago",
  },
  {
    type: "info",
    title: "New Staff Member",
    message: "Dr. Jennifer Adams joined Cardiology department",
    time: "4 hours ago",
  },
  {
    type: "error",
    title: "Payment System",
    message: "Payment gateway experiencing delays",
    time: "6 hours ago",
  },
]

const departmentStats = [
  { name: "Emergency", patients: 45, capacity: 60, utilization: 75 },
  { name: "Cardiology", patients: 32, capacity: 40, utilization: 80 },
  { name: "Pediatrics", patients: 28, capacity: 35, utilization: 80 },
  { name: "Orthopedics", patients: 22, capacity: 30, utilization: 73 },
  { name: "Neurology", patients: 18, capacity: 25, utilization: 72 },
]

const upcomingAppointments = [
  {
    id: "A001",
    patient: "John Smith",
    doctor: "Dr. Wilson",
    time: "09:00 AM",
    type: "Follow-up",
    status: "Confirmed",
  },
  {
    id: "A002",
    patient: "Sarah Johnson",
    doctor: "Dr. Brown",
    time: "10:30 AM",
    type: "Consultation",
    status: "Pending",
  },
  {
    id: "A003",
    patient: "Mike Davis",
    doctor: "Dr. Lee",
    time: "11:15 AM",
    type: "Check-up",
    status: "Confirmed",
  },
  {
    id: "A004",
    patient: "Emily Wilson",
    doctor: "Dr. Smith",
    time: "02:00 PM",
    type: "Emergency",
    status: "Urgent",
  },
]

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening at your hospital today.</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search patients, doctors..."
              className="pl-10 w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Bell className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat, index) => {
          const Icon = stat.icon
          const TrendIcon = stat.trend === "up" ? TrendingUp : TrendingDown
          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <div className="flex items-center mt-2">
                      <TrendIcon
                        className={`h-4 w-4 mr-1 ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}
                      />
                      <span
                        className={`text-sm font-medium ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}
                      >
                        {stat.change}
                      </span>
                      <span className="text-sm text-gray-600 ml-1">from last month</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Patients */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Patients</CardTitle>
                  <CardDescription>Latest patient registrations and updates</CardDescription>
                </div>
                <Link href="/admin/patients">
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentPatients.map((patient) => (
                  <div key={patient.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" />
                        <AvatarFallback className="bg-blue-100 text-blue-600">{patient.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-gray-900">{patient.name}</p>
                        <p className="text-sm text-gray-600">
                          {patient.id} • {patient.age}y • {patient.condition}
                        </p>
                        <p className="text-sm text-gray-600">
                          Dr: {patient.doctor} • Last visit: {patient.lastVisit}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant={
                        patient.status === "Active"
                          ? "default"
                          : patient.status === "Monitoring"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {patient.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Department Utilization */}
          <Card>
            <CardHeader>
              <CardTitle>Department Utilization</CardTitle>
              <CardDescription>Current capacity and patient distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {departmentStats.map((dept, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">{dept.name}</span>
                      <span className="text-sm text-gray-600">
                        {dept.patients}/{dept.capacity} patients
                      </span>
                    </div>
                    <Progress value={dept.utilization} className="h-2" />
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>{dept.utilization}% utilized</span>
                      <span>{dept.capacity - dept.patients} beds available</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* System Alerts */}
          <Card>
            <CardHeader>
              <CardTitle>System Alerts</CardTitle>
              <CardDescription>Important notifications and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemAlerts.map((alert, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50">
                    <div className="mt-0.5">
                      {alert.type === "warning" && <AlertCircle className="h-4 w-4 text-yellow-600" />}
                      {alert.type === "info" && <CheckCircle className="h-4 w-4 text-blue-600" />}
                      {alert.type === "error" && <AlertCircle className="h-4 w-4 text-red-600" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm text-gray-900">{alert.title}</p>
                      <p className="text-sm text-gray-600">{alert.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Today's Appointments */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Today's Appointments</CardTitle>
                  <CardDescription>Upcoming scheduled appointments</CardDescription>
                </div>
                <Link href="/admin/appointments">
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm text-gray-900">{appointment.patient}</p>
                      <p className="text-xs text-gray-600">{appointment.doctor}</p>
                      <p className="text-xs text-gray-600">
                        {appointment.time} • {appointment.type}
                      </p>
                    </div>
                    <Badge
                      variant={
                        appointment.status === "Confirmed"
                          ? "default"
                          : appointment.status === "Urgent"
                            ? "destructive"
                            : "secondary"
                      }
                    >
                      {appointment.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common administrative tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/admin/patients">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Patient
                </Button>
              </Link>
              <Link href="/admin/doctors">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <UserCheck className="h-4 w-4 mr-2" />
                  Manage Doctors
                </Button>
              </Link>
              <Link href="/admin/appointments">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Appointment
                </Button>
              </Link>
              <Link href="/admin/reports">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Activity className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
              </Link>
              <Link href="/admin/settings">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Settings className="h-4 w-4 mr-2" />
                  System Settings
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
