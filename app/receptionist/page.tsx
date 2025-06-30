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
  Calendar,
  CreditCard,
  UserPlus,
  CalendarPlus,
  Search,
  CheckCircle,
  AlertCircle,
  Phone,
  FileText,
  Printer,
} from "lucide-react"
import Link from "next/link"

// Mock data
const todayStats = [
  { title: "Today's Appointments", value: "32", icon: Calendar, color: "text-blue-600", bgColor: "bg-blue-50" },
  { title: "Walk-ins", value: "8", icon: Users, color: "text-green-600", bgColor: "bg-green-50" },
  { title: "Checked In", value: "24", icon: CheckCircle, color: "text-purple-600", bgColor: "bg-purple-50" },
  { title: "Payments Today", value: "$2,450", icon: CreditCard, color: "text-emerald-600", bgColor: "bg-emerald-50" },
]

const todaySchedule = [
  {
    id: "A001",
    patient: "John Smith",
    doctor: "Dr. Wilson",
    time: "09:00 AM",
    type: "Consultation",
    status: "Checked In",
    phone: "(555) 123-4567",
    insurance: "Blue Cross",
    avatar: "JS",
  },
  {
    id: "A002",
    patient: "Sarah Johnson",
    doctor: "Dr. Brown",
    time: "10:30 AM",
    type: "Follow-up",
    status: "Waiting",
    phone: "(555) 234-5678",
    insurance: "Aetna",
    avatar: "SJ",
  },
  {
    id: "A003",
    patient: "Mike Davis",
    doctor: "Dr. Lee",
    time: "11:15 AM",
    type: "Check-up",
    status: "Confirmed",
    phone: "(555) 345-6789",
    insurance: "Cigna",
    avatar: "MD",
  },
  {
    id: "A004",
    patient: "Emily Wilson",
    doctor: "Dr. Smith",
    time: "02:00 PM",
    type: "Emergency",
    status: "Urgent",
    phone: "(555) 456-7890",
    insurance: "United Healthcare",
    avatar: "EW",
  },
  {
    id: "A005",
    patient: "Robert Brown",
    doctor: "Dr. Johnson",
    time: "03:30 PM",
    type: "Consultation",
    status: "Scheduled",
    phone: "(555) 567-8901",
    insurance: "Medicare",
    avatar: "RB",
  },
]

const waitingRoom = [
  { name: "Sarah Johnson", doctor: "Dr. Brown", waitTime: "15 min", status: "Waiting", priority: "normal" },
  { name: "John Smith", doctor: "Dr. Wilson", waitTime: "5 min", status: "In Progress", priority: "normal" },
  { name: "Emily Wilson", doctor: "Dr. Smith", waitTime: "0 min", status: "Just Arrived", priority: "urgent" },
]

const doctorAvailability = [
  { name: "Dr. Wilson", specialty: "Cardiology", status: "Available", nextFree: "11:30 AM", patients: 3 },
  { name: "Dr. Brown", specialty: "Pediatrics", status: "Busy", nextFree: "12:00 PM", patients: 4 },
  { name: "Dr. Lee", specialty: "Orthopedics", status: "Available", nextFree: "Now", patients: 2 },
  { name: "Dr. Smith", specialty: "Emergency", status: "Busy", nextFree: "02:30 PM", patients: 5 },
]

const recentTransactions = [
  { id: "T001", patient: "John Smith", amount: "$150", type: "Consultation", method: "Insurance", time: "10:30 AM" },
  { id: "T002", patient: "Mary Jones", amount: "$75", type: "Follow-up", method: "Cash", time: "09:45 AM" },
  { id: "T003", patient: "David Wilson", amount: "$200", type: "Procedure", method: "Card", time: "09:15 AM" },
]

export default function ReceptionistDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const currentTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Good morning, Reception!</h1>
          <p className="text-gray-600">You have 8 patients waiting and 4 appointments remaining today.</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Quick patient search..."
              className="pl-10 w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {todayStats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
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

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Today's Schedule */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Today's Schedule</CardTitle>
                    <CardDescription>Patient appointments for {new Date().toLocaleDateString()}</CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Link href="/receptionist/appointments">
                      <Button variant="outline" size="sm">
                        <CalendarPlus className="h-4 w-4 mr-2" />
                        New Appointment
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Walk-in
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todaySchedule.map((appointment) => (
                    <div
                      key={appointment.id}
                      className={`flex items-center justify-between p-4 rounded-lg border-l-4 ${
                        appointment.status === "Checked In"
                          ? "bg-green-50 border-green-500"
                          : appointment.status === "Waiting"
                            ? "bg-blue-50 border-blue-500"
                            : appointment.status === "Urgent"
                              ? "bg-red-50 border-red-500"
                              : "bg-gray-50 border-gray-300"
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src="/placeholder.svg?height=32&width=32" />
                          <AvatarFallback className="bg-blue-100 text-blue-600">{appointment.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-gray-900">{appointment.patient}</p>
                          <p className="text-sm text-gray-600">
                            {appointment.time} • {appointment.doctor} • {appointment.type}
                          </p>
                          <p className="text-sm text-gray-600">
                            {appointment.phone} • {appointment.insurance}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant={
                            appointment.status === "Checked In"
                              ? "default"
                              : appointment.status === "Waiting"
                                ? "secondary"
                                : appointment.status === "Urgent"
                                  ? "destructive"
                                  : "outline"
                          }
                        >
                          {appointment.status}
                        </Badge>
                        <div className="flex space-x-1">
                          {appointment.status === "Confirmed" && (
                            <Button variant="outline" size="sm">
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                          )}
                          <Button variant="outline" size="sm">
                            <Phone className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <FileText className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Billing */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Recent Transactions</CardTitle>
                    <CardDescription>Today's payment activity</CardDescription>
                  </div>
                  <Link href="/receptionist/billing">
                    <Button variant="outline" size="sm">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Process Payment
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{transaction.patient}</p>
                        <p className="text-sm text-gray-600">
                          {transaction.type} • {transaction.method} • {transaction.time}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600">{transaction.amount}</p>
                        <Button variant="outline" size="sm">
                          <Printer className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Waiting Room Status */}
            <Card>
              <CardHeader>
                <CardTitle>Waiting Room</CardTitle>
                <CardDescription>Current patients waiting</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {waitingRoom.map((patient, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg ${
                        patient.priority === "urgent" ? "bg-red-50 border border-red-200" : "bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">{patient.name}</p>
                          <p className="text-sm text-gray-600">{patient.doctor}</p>
                          <p className="text-sm text-gray-600">Waiting: {patient.waitTime}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          {patient.priority === "urgent" && <AlertCircle className="h-4 w-4 text-red-500" />}
                          <Badge
                            variant={
                              patient.status === "In Progress"
                                ? "default"
                                : patient.status === "Waiting"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {patient.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Doctor Availability */}
            <Card>
              <CardHeader>
                <CardTitle>Doctor Availability</CardTitle>
                <CardDescription>Current doctor status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {doctorAvailability.map((doctor, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{doctor.name}</p>
                        <p className="text-sm text-gray-600">{doctor.specialty}</p>
                        <p className="text-sm text-gray-600">Next free: {doctor.nextFree}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant={doctor.status === "Available" ? "default" : "secondary"}>{doctor.status}</Badge>
                        <p className="text-xs text-gray-500 mt-1">{doctor.patients} patients</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common front desk tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/receptionist/registration">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Register New Patient
                  </Button>
                </Link>
                <Link href="/receptionist/appointments">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <CalendarPlus className="h-4 w-4 mr-2" />
                    Schedule Appointment
                  </Button>
                </Link>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Patient
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Emergency Check-in
                </Button>
                <Link href="/receptionist/billing">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Process Payment
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Daily Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Daily Progress</CardTitle>
                <CardDescription>Today's completion status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Appointments</span>
                    <span className="text-sm text-gray-600">24/32</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Check-ins</span>
                    <span className="text-sm text-gray-600">24/32</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Payments</span>
                    <span className="text-sm text-gray-600">18/24</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Daily Revenue</span>
                    <span className="text-sm text-gray-600">$2,450/$3,200</span>
                  </div>
                  <Progress value={77} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
