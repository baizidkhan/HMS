"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Calendar, Users, FileText, Search, Video, Activity, AlertCircle, Phone } from "lucide-react"
import Link from "next/link"

// Mock data
const todayStats = [
  { title: "Today's Appointments", value: "12", icon: Calendar, color: "text-blue-600", bgColor: "bg-blue-50" },
  { title: "Patients Seen", value: "8", icon: Users, color: "text-green-600", bgColor: "bg-green-50" },
  { title: "Pending Notes", value: "3", icon: FileText, color: "text-orange-600", bgColor: "bg-orange-50" },
  { title: "Teleconsults", value: "2", icon: Video, color: "text-purple-600", bgColor: "bg-purple-50" },
]

const todayAppointments = [
  {
    id: "A001",
    patient: "John Smith",
    time: "09:00 AM",
    duration: "30 min",
    type: "Consultation",
    status: "Completed",
    reason: "Hypertension follow-up",
    avatar: "JS",
  },
  {
    id: "A002",
    patient: "Sarah Johnson",
    time: "10:30 AM",
    duration: "45 min",
    type: "Follow-up",
    status: "In Progress",
    reason: "Diabetes management",
    avatar: "SJ",
  },
  {
    id: "A003",
    patient: "Mike Davis",
    time: "11:15 AM",
    duration: "30 min",
    type: "Check-up",
    status: "Waiting",
    reason: "Fracture recovery assessment",
    avatar: "MD",
  },
  {
    id: "A004",
    patient: "Emily Wilson",
    time: "02:00 PM",
    duration: "60 min",
    type: "Emergency",
    status: "Scheduled",
    reason: "Chest pain evaluation",
    avatar: "EW",
  },
  {
    id: "A005",
    patient: "Robert Brown",
    time: "03:30 PM",
    duration: "30 min",
    type: "Teleconsult",
    status: "Scheduled",
    reason: "Medication review",
    avatar: "RB",
  },
]

const patientQueue = [
  { name: "Sarah Johnson", waitTime: "15 min", status: "In Progress", priority: "normal" },
  { name: "Mike Davis", waitTime: "5 min", status: "Waiting", priority: "normal" },
  { name: "Emily Wilson", waitTime: "0 min", status: "Just Arrived", priority: "urgent" },
]

const recentNotes = [
  {
    patient: "John Smith",
    date: "Today, 9:30 AM",
    note: "Patient responding well to Lisinopril. BP: 135/85. Continue current medication.",
    type: "Follow-up",
  },
  {
    patient: "Lisa Anderson",
    date: "Yesterday, 3:15 PM",
    note: "Completed physical examination. All vitals normal. Recommended annual screening.",
    type: "Check-up",
  },
  {
    patient: "David Wilson",
    date: "Yesterday, 11:00 AM",
    note: "X-ray shows healing progress. Remove cast in 2 weeks. Physical therapy recommended.",
    type: "Follow-up",
  },
]

const aiSuggestions = [
  {
    type: "diagnosis",
    title: "Potential Drug Interaction Alert",
    message: "Patient John Smith: Lisinopril + Ibuprofen may increase kidney risk",
    priority: "high",
  },
  {
    type: "treatment",
    title: "Treatment Recommendation",
    message: "For Sarah Johnson's diabetes: Consider adding Metformin XR for better compliance",
    priority: "medium",
  },
  {
    type: "followup",
    title: "Follow-up Reminder",
    message: "Mike Davis due for fracture healing assessment in 1 week",
    priority: "low",
  },
]

export default function DoctorDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const currentTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Good morning, Dr. Wilson!</h1>
          <p className="text-gray-600">You have 4 appointments remaining today. Here's your overview.</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">{currentTime}</p>
            <p className="text-xs text-gray-600">Current Time</p>
          </div>
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
                    <CardTitle>Today's Appointments</CardTitle>
                    <CardDescription>Your schedule for {new Date().toLocaleDateString()}</CardDescription>
                  </div>
                  <Link href="/doctor/appointments">
                    <Button variant="outline" size="sm">
                      View Calendar
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todayAppointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className={`flex items-center justify-between p-4 rounded-lg border-l-4 ${
                        appointment.status === "Completed"
                          ? "bg-green-50 border-green-500"
                          : appointment.status === "In Progress"
                            ? "bg-blue-50 border-blue-500"
                            : appointment.status === "Waiting"
                              ? "bg-yellow-50 border-yellow-500"
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
                            {appointment.time} • {appointment.duration} • {appointment.type}
                          </p>
                          <p className="text-sm text-gray-700">{appointment.reason}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant={
                            appointment.status === "Completed"
                              ? "default"
                              : appointment.status === "In Progress"
                                ? "secondary"
                                : appointment.status === "Emergency"
                                  ? "destructive"
                                  : "outline"
                          }
                        >
                          {appointment.status}
                        </Badge>
                        {appointment.type === "Teleconsult" && <Video className="h-4 w-4 text-purple-600" />}
                        <Button variant="outline" size="sm">
                          {appointment.status === "Completed" ? "View Notes" : "Start"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Patient Notes */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Recent Patient Notes</CardTitle>
                    <CardDescription>Your latest patient interactions</CardDescription>
                  </div>
                  <Link href="/doctor/notes">
                    <Button variant="outline" size="sm">
                      View All Notes
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentNotes.map((note, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium text-gray-900">{note.patient}</p>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{note.type}</Badge>
                          <span className="text-xs text-gray-500">{note.date}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700">{note.note}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Patient Queue */}
            <Card>
              <CardHeader>
                <CardTitle>Patient Queue</CardTitle>
                <CardDescription>Current waiting patients</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {patientQueue.map((patient, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{patient.name}</p>
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
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Medical Assistant */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5 text-purple-600" />
                  <span>AI Assistant</span>
                </CardTitle>
                <CardDescription>Smart suggestions and alerts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {aiSuggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg border-l-4 ${
                        suggestion.priority === "high"
                          ? "bg-red-50 border-red-500"
                          : suggestion.priority === "medium"
                            ? "bg-yellow-50 border-yellow-500"
                            : "bg-blue-50 border-blue-500"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium text-sm text-gray-900">{suggestion.title}</p>
                          <p className="text-xs text-gray-600 mt-1">{suggestion.message}</p>
                        </div>
                        {suggestion.priority === "high" && <AlertCircle className="h-4 w-4 text-red-500 mt-0.5" />}
                      </div>
                    </div>
                  ))}
                </div>
                <Link href="/doctor/ai-assistant">
                  <Button variant="outline" className="w-full mt-4 bg-transparent">
                    Open AI Assistant
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/doctor/patients">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Users className="h-4 w-4 mr-2" />
                    Search Patients
                  </Button>
                </Link>
                <Link href="/doctor/notes">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <FileText className="h-4 w-4 mr-2" />
                    Write Prescription
                  </Button>
                </Link>
                <Link href="/doctor/telemedicine">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Video className="h-4 w-4 mr-2" />
                    Start Teleconsult
                  </Button>
                </Link>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Phone className="h-4 w-4 mr-2" />
                  Emergency Call
                </Button>
              </CardContent>
            </Card>

            {/* Today's Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Today's Progress</CardTitle>
                <CardDescription>Your daily completion status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Appointments</span>
                    <span className="text-sm text-gray-600">8/12</span>
                  </div>
                  <Progress value={67} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Patient Notes</span>
                    <span className="text-sm text-gray-600">5/8</span>
                  </div>
                  <Progress value={63} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Prescriptions</span>
                    <span className="text-sm text-gray-600">6/6</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
