"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Calendar, User, UserPlus, Phone, Mail, Search, Filter, Edit, CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"

// Mock data
const doctors = [
  { id: "D001", name: "Dr. James Wilson", specialty: "Cardiology", available: true },
  { id: "D002", name: "Dr. Sarah Brown", specialty: "Pediatrics", available: false },
  { id: "D003", name: "Dr. Michael Lee", specialty: "Orthopedics", available: true },
  { id: "D004", name: "Dr. Lisa Smith", specialty: "Emergency Medicine", available: true },
]

const patients = [
  { id: "P001", name: "John Smith", phone: "(555) 123-4567", email: "john.smith@email.com" },
  { id: "P002", name: "Sarah Johnson", phone: "(555) 234-5678", email: "sarah.j@email.com" },
  { id: "P003", name: "Mike Davis", phone: "(555) 345-6789", email: "mike.davis@email.com" },
]

const appointments = [
  {
    id: "A001",
    patient: "John Smith",
    patientId: "P001",
    doctor: "Dr. Wilson",
    date: "2024-01-20",
    time: "09:00 AM",
    duration: "30 min",
    type: "Consultation",
    status: "Confirmed",
    reason: "Hypertension follow-up",
    phone: "(555) 123-4567",
    notes: "Patient needs BP check",
  },
  {
    id: "A002",
    patient: "Sarah Johnson",
    patientId: "P002",
    doctor: "Dr. Brown",
    date: "2024-01-20",
    time: "10:30 AM",
    duration: "45 min",
    type: "Follow-up",
    status: "Pending",
    reason: "Diabetes management",
    phone: "(555) 234-5678",
    notes: "Review lab results",
  },
]

const timeSlots = [
  "08:00 AM",
  "08:30 AM",
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "01:00 PM",
  "01:30 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
  "05:00 PM",
]

export default function AppointmentManagement() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])
  const [isNewAppointmentOpen, setIsNewAppointmentOpen] = useState(false)
  const [isWalkInOpen, setIsWalkInOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [newAppointment, setNewAppointment] = useState({
    patient: "",
    doctor: "",
    date: "",
    time: "",
    type: "",
    reason: "",
    notes: "",
  })

  const filteredAppointments = appointments.filter(
    (apt) =>
      apt.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.doctor.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/receptionist" className="flex items-center space-x-2">
                <Calendar className="h-8 w-8 text-blue-600" />
                <div>
                  <span className="text-xl font-bold text-gray-900">Appointment Management</span>
                  <p className="text-sm text-gray-600">Schedule and manage patient appointments</p>
                </div>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Dialog open={isWalkInOpen} onOpenChange={setIsWalkInOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Walk-in Registration
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Walk-in Registration</DialogTitle>
                    <DialogDescription>Register a walk-in patient for immediate care</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div>
                      <Label htmlFor="walkInName">Patient Name</Label>
                      <Input id="walkInName" placeholder="Enter patient name" />
                    </div>
                    <div>
                      <Label htmlFor="walkInPhone">Phone Number</Label>
                      <Input id="walkInPhone" placeholder="(555) 123-4567" />
                    </div>
                    <div>
                      <Label htmlFor="walkInReason">Reason for Visit</Label>
                      <Textarea id="walkInReason" placeholder="Brief description of the issue" />
                    </div>
                    <div>
                      <Label htmlFor="walkInUrgency">Urgency Level</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select urgency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low - Can wait</SelectItem>
                          <SelectItem value="medium">Medium - Moderate concern</SelectItem>
                          <SelectItem value="high">High - Urgent care needed</SelectItem>
                          <SelectItem value="emergency">Emergency - Immediate attention</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsWalkInOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setIsWalkInOpen(false)}>Register Walk-in</Button>
                  </div>
                </DialogContent>
              </Dialog>
              <Link href="/receptionist">
                <Button variant="outline">Back to Dashboard</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Quick Booking Section */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Quick Appointment Booking</CardTitle>
                <CardDescription>Fast appointment scheduling for existing patients</CardDescription>
              </div>
              <Dialog open={isNewAppointmentOpen} onOpenChange={setIsNewAppointmentOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Calendar className="h-4 w-4 mr-2" />
                    New Appointment
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Schedule New Appointment</DialogTitle>
                    <DialogDescription>Book an appointment for a patient</DialogDescription>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-4 py-4">
                    <div>
                      <Label htmlFor="patient">Patient</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select patient" />
                        </SelectTrigger>
                        <SelectContent>
                          {patients.map((patient) => (
                            <SelectItem key={patient.id} value={patient.id}>
                              {patient.name} - {patient.phone}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="doctor">Doctor</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select doctor" />
                        </SelectTrigger>
                        <SelectContent>
                          {doctors.map((doctor) => (
                            <SelectItem key={doctor.id} value={doctor.id} disabled={!doctor.available}>
                              {doctor.name} - {doctor.specialty} {!doctor.available && "(Unavailable)"}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="date">Date</Label>
                      <Input id="date" type="date" />
                    </div>
                    <div>
                      <Label htmlFor="time">Time</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="type">Appointment Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="consultation">Consultation</SelectItem>
                          <SelectItem value="follow-up">Follow-up</SelectItem>
                          <SelectItem value="check-up">Check-up</SelectItem>
                          <SelectItem value="procedure">Procedure</SelectItem>
                          <SelectItem value="emergency">Emergency</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="duration">Duration</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 minutes</SelectItem>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="45">45 minutes</SelectItem>
                          <SelectItem value="60">1 hour</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="reason">Reason for Visit</Label>
                      <Input id="reason" placeholder="Brief description of the visit purpose" />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="notes">Notes</Label>
                      <Textarea id="notes" placeholder="Additional notes or special instructions" />
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsNewAppointmentOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setIsNewAppointmentOpen(false)}>Schedule Appointment</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-4">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select patient" />
                </SelectTrigger>
                <SelectContent>
                  {patients.map((patient) => (
                    <SelectItem key={patient.id} value={patient.id}>
                      {patient.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select doctor" />
                </SelectTrigger>
                <SelectContent>
                  {doctors
                    .filter((d) => d.available)
                    .map((doctor) => (
                      <SelectItem key={doctor.id} value={doctor.id}>
                        {doctor.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <Input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button className="w-full">Book Now</Button>
            </div>
          </CardContent>
        </Card>

        {/* Appointment List */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Today's Appointments</CardTitle>
                    <CardDescription>Manage and track patient appointments</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Search appointments..."
                        className="pl-10 w-64"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredAppointments.map((appointment) => (
                    <div key={appointment.id} className="p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarImage src="/placeholder.svg?height=32&width=32" />
                            <AvatarFallback className="bg-blue-100 text-blue-600">
                              {appointment.patient
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-gray-900">{appointment.patient}</p>
                            <p className="text-sm text-gray-600">
                              {appointment.time} • {appointment.doctor} • {appointment.duration}
                            </p>
                            <p className="text-sm text-gray-600">{appointment.reason}</p>
                            <p className="text-sm text-gray-600">{appointment.phone}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={appointment.status === "Confirmed" ? "default" : "secondary"}>
                            {appointment.status}
                          </Badge>
                          <div className="flex space-x-1">
                            <Button variant="outline" size="sm">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Phone className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <XCircle className="h-4 w-4 text-red-600" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Doctor Availability Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Doctor Availability</CardTitle>
                <CardDescription>Real-time doctor schedules</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {doctors.map((doctor) => (
                    <div key={doctor.id} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">{doctor.name}</p>
                          <p className="text-sm text-gray-600">{doctor.specialty}</p>
                        </div>
                        <Badge variant={doctor.available ? "default" : "secondary"}>
                          {doctor.available ? "Available" : "Busy"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Available Time Slots</CardTitle>
                <CardDescription>Open slots for {selectedDate}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {timeSlots.slice(0, 8).map((time) => (
                    <Button key={time} variant="outline" size="sm" className="text-xs bg-transparent">
                      {time}
                    </Button>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4 bg-transparent">
                  View All Slots
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Calendar className="h-4 w-4 mr-2" />
                  Block Time Slot
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <User className="h-4 w-4 mr-2" />
                  Add New Patient
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Reminder
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Confirmation
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
