"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { format } from "date-fns"
import {
  Search,
  CalendarIcon,
  Clock,
  User,
  UserCheck,
  Plus,
  Edit,
  Download,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
} from "lucide-react"

// Mock appointments data
const mockAppointments = [
  {
    id: "APT001",
    patientName: "Sarah Johnson",
    patientId: "P001",
    doctorName: "Dr. Michael Smith",
    doctorId: "D001",
    department: "Cardiology",
    date: "2024-01-25",
    time: "09:00",
    duration: 30,
    status: "Scheduled",
    type: "Consultation",
    priority: "Normal",
    notes: "Regular checkup for heart condition",
    contactNumber: "+1 (555) 123-4567",
    email: "sarah.johnson@email.com",
    reason: "Chest pain follow-up",
  },
  {
    id: "APT002",
    patientName: "Michael Chen",
    patientId: "P002",
    doctorName: "Dr. Emily Davis",
    doctorId: "D002",
    department: "Neurology",
    date: "2024-01-25",
    time: "10:30",
    duration: 45,
    status: "Confirmed",
    type: "Follow-up",
    priority: "High",
    notes: "Post-surgery follow-up",
    contactNumber: "+1 (555) 234-5678",
    email: "michael.chen@email.com",
    reason: "Neurological assessment",
  },
  {
    id: "APT003",
    patientName: "Emily Wilson",
    patientId: "P003",
    doctorName: "Dr. Robert Brown",
    doctorId: "D003",
    department: "Orthopedics",
    date: "2024-01-25",
    time: "14:00",
    duration: 30,
    status: "Completed",
    type: "Consultation",
    priority: "Normal",
    notes: "Knee pain evaluation",
    contactNumber: "+1 (555) 345-6789",
    email: "emily.wilson@email.com",
    reason: "Joint pain assessment",
  },
  {
    id: "APT004",
    patientName: "David Martinez",
    patientId: "P004",
    doctorName: "Dr. Lisa Anderson",
    doctorId: "D004",
    department: "Pediatrics",
    date: "2024-01-26",
    time: "11:00",
    duration: 30,
    status: "Cancelled",
    type: "Vaccination",
    priority: "Normal",
    notes: "Annual vaccination schedule",
    contactNumber: "+1 (555) 456-7890",
    email: "david.martinez@email.com",
    reason: "Routine vaccination",
  },
  {
    id: "APT005",
    patientName: "Jennifer Taylor",
    patientId: "P005",
    doctorName: "Dr. James Wilson",
    doctorId: "D005",
    department: "Dermatology",
    date: "2024-01-26",
    time: "15:30",
    duration: 30,
    status: "Scheduled",
    type: "Consultation",
    priority: "Urgent",
    notes: "Skin condition evaluation",
    contactNumber: "+1 (555) 567-8901",
    email: "jennifer.taylor@email.com",
    reason: "Skin rash examination",
  },
]

const doctors = [
  { id: "D001", name: "Dr. Michael Smith", department: "Cardiology" },
  { id: "D002", name: "Dr. Emily Davis", department: "Neurology" },
  { id: "D003", name: "Dr. Robert Brown", department: "Orthopedics" },
  { id: "D004", name: "Dr. Lisa Anderson", department: "Pediatrics" },
  { id: "D005", name: "Dr. James Wilson", department: "Dermatology" },
]

const departments = ["Cardiology", "Neurology", "Orthopedics", "Pediatrics", "Dermatology", "General Medicine"]

const timeSlots = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
]

export default function AdminAppointmentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [selectedDate, setSelectedDate] = useState(null)
  const [isNewAppointmentOpen, setIsNewAppointmentOpen] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  // New appointment form state
  const [newAppointment, setNewAppointment] = useState({
    patientName: "",
    patientId: "",
    doctorId: "",
    department: "",
    date: null,
    time: "",
    duration: 30,
    type: "Consultation",
    priority: "Normal",
    reason: "",
    notes: "",
    contactNumber: "",
    email: "",
  })

  const filteredAppointments = mockAppointments.filter((appointment) => {
    const matchesSearch =
      appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.id.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = selectedStatus === "all" || appointment.status.toLowerCase() === selectedStatus.toLowerCase()
    const matchesDepartment = selectedDepartment === "all" || appointment.department === selectedDepartment
    const matchesDate = !selectedDate || appointment.date === format(selectedDate, "yyyy-MM-dd")

    return matchesSearch && matchesStatus && matchesDepartment && matchesDate
  })

  const getStatusColor = (status) => {
    switch (status) {
      case "Scheduled":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Confirmed":
        return "bg-green-100 text-green-800 border-green-200"
      case "Completed":
        return "bg-gray-100 text-gray-800 border-gray-200"
      case "Cancelled":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "Scheduled":
        return <Clock className="h-4 w-4" />
      case "Confirmed":
        return <CheckCircle className="h-4 w-4" />
      case "Completed":
        return <CheckCircle className="h-4 w-4" />
      case "Cancelled":
        return <XCircle className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Urgent":
        return "bg-red-100 text-red-800"
      case "High":
        return "bg-orange-100 text-orange-800"
      case "Normal":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleCreateAppointment = () => {
    console.log("Creating appointment:", newAppointment)
    setIsNewAppointmentOpen(false)
    setNewAppointment({
      patientName: "",
      patientId: "",
      doctorId: "",
      department: "",
      date: null,
      time: "",
      duration: 30,
      type: "Consultation",
      priority: "Normal",
      reason: "",
      notes: "",
      contactNumber: "",
      email: "",
    })
  }

  const handleViewAppointment = (appointment) => {
    setSelectedAppointment(appointment)
    setIsViewDialogOpen(true)
  }

  const handleEditAppointment = (appointment) => {
    setSelectedAppointment(appointment)
    setIsEditDialogOpen(true)
  }

  const handleUpdateStatus = (appointmentId, newStatus) => {
    console.log(`Updating appointment ${appointmentId} status to ${newStatus}`)
  }

  const appointmentStats = {
    total: mockAppointments.length,
    scheduled: mockAppointments.filter((a) => a.status === "Scheduled").length,
    confirmed: mockAppointments.filter((a) => a.status === "Confirmed").length,
    completed: mockAppointments.filter((a) => a.status === "Completed").length,
    cancelled: mockAppointments.filter((a) => a.status === "Cancelled").length,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Appointment Management</h1>
          <p className="text-gray-600">Manage and schedule patient appointments</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Dialog open={isNewAppointmentOpen} onOpenChange={setIsNewAppointmentOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Appointment
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Schedule New Appointment</DialogTitle>
                <DialogDescription>Create a new appointment for a patient</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="patientName">Patient Name</Label>
                  <Input
                    id="patientName"
                    value={newAppointment.patientName}
                    onChange={(e) => setNewAppointment({ ...newAppointment, patientName: e.target.value })}
                    placeholder="Enter patient name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="patientId">Patient ID</Label>
                  <Input
                    id="patientId"
                    value={newAppointment.patientId}
                    onChange={(e) => setNewAppointment({ ...newAppointment, patientId: e.target.value })}
                    placeholder="Enter patient ID"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="doctor">Doctor</Label>
                  <Select
                    value={newAppointment.doctorId}
                    onValueChange={(value) => setNewAppointment({ ...newAppointment, doctorId: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select doctor" />
                    </SelectTrigger>
                    <SelectContent>
                      {doctors.map((doctor) => (
                        <SelectItem key={doctor.id} value={doctor.id}>
                          {doctor.name} - {doctor.department}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select
                    value={newAppointment.department}
                    onValueChange={(value) => setNewAppointment({ ...newAppointment, department: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Appointment Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {newAppointment.date ? format(newAppointment.date, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={newAppointment.date}
                        onSelect={(date) => setNewAppointment({ ...newAppointment, date })}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Select
                    value={newAppointment.time}
                    onValueChange={(value) => setNewAppointment({ ...newAppointment, time: value })}
                  >
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
                <div className="space-y-2">
                  <Label htmlFor="type">Appointment Type</Label>
                  <Select
                    value={newAppointment.type}
                    onValueChange={(value) => setNewAppointment({ ...newAppointment, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Consultation">Consultation</SelectItem>
                      <SelectItem value="Follow-up">Follow-up</SelectItem>
                      <SelectItem value="Vaccination">Vaccination</SelectItem>
                      <SelectItem value="Surgery">Surgery</SelectItem>
                      <SelectItem value="Emergency">Emergency</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    value={newAppointment.priority}
                    onValueChange={(value) => setNewAppointment({ ...newAppointment, priority: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Normal">Normal</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="reason">Reason for Visit</Label>
                  <Input
                    id="reason"
                    value={newAppointment.reason}
                    onChange={(e) => setNewAppointment({ ...newAppointment, reason: e.target.value })}
                    placeholder="Brief reason for appointment"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact">Contact Number</Label>
                  <Input
                    id="contact"
                    value={newAppointment.contactNumber}
                    onChange={(e) => setNewAppointment({ ...newAppointment, contactNumber: e.target.value })}
                    placeholder="Patient contact number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newAppointment.email}
                    onChange={(e) => setNewAppointment({ ...newAppointment, email: e.target.value })}
                    placeholder="Patient email address"
                  />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={newAppointment.notes}
                    onChange={(e) => setNewAppointment({ ...newAppointment, notes: e.target.value })}
                    placeholder="Additional notes or special instructions"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsNewAppointmentOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateAppointment}>Schedule Appointment</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{appointmentStats.total}</div>
            <p className="text-xs text-muted-foreground">All appointments</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{appointmentStats.scheduled}</div>
            <p className="text-xs text-muted-foreground">Pending confirmation</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Confirmed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{appointmentStats.confirmed}</div>
            <p className="text-xs text-muted-foreground">Ready to proceed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <UserCheck className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">{appointmentStats.completed}</div>
            <p className="text-xs text-muted-foreground">Successfully finished</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cancelled</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{appointmentStats.cancelled}</div>
            <p className="text-xs text-muted-foreground">Cancelled appointments</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search appointments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-[200px] justify-start text-left font-normal bg-transparent">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
              </PopoverContent>
            </Popover>
            {(selectedDate || selectedStatus !== "all" || selectedDepartment !== "all") && (
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedDate(null)
                  setSelectedStatus("all")
                  setSelectedDepartment("all")
                }}
              >
                Clear Filters
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Appointments List */}
      <Card>
        <CardHeader>
          <CardTitle>Appointments ({filteredAppointments.length})</CardTitle>
          <CardDescription>Manage all patient appointments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredAppointments.map((appointment) => (
              <div key={appointment.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>
                        {appointment.patientName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold">{appointment.patientName}</h3>
                        <Badge variant="outline" className={getStatusColor(appointment.status)}>
                          {getStatusIcon(appointment.status)}
                          <span className="ml-1">{appointment.status}</span>
                        </Badge>
                        <Badge variant="secondary" className={getPriorityColor(appointment.priority)}>
                          {appointment.priority}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {appointment.doctorName}
                        </span>
                        <span>{appointment.department}</span>
                        <span className="flex items-center">
                          <CalendarIcon className="h-4 w-4 mr-1" />
                          {new Date(appointment.date).toLocaleDateString()}
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {appointment.time}
                        </span>
                        <span>{appointment.type}</span>
                      </div>
                      <p className="text-sm text-gray-500">{appointment.reason}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleViewAppointment(appointment)}>
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleEditAppointment(appointment)}>
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Select onValueChange={(value) => handleUpdateStatus(appointment.id, value)}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Update Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Scheduled">Scheduled</SelectItem>
                        <SelectItem value="Confirmed">Confirmed</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                        <SelectItem value="Cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* View Appointment Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Appointment Details</DialogTitle>
            <DialogDescription>Complete appointment information</DialogDescription>
          </DialogHeader>
          {selectedAppointment && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Patient Information</h4>
                  <div className="space-y-1 text-sm">
                    <p>
                      <strong>Name:</strong> {selectedAppointment.patientName}
                    </p>
                    <p>
                      <strong>ID:</strong> {selectedAppointment.patientId}
                    </p>
                    <p>
                      <strong>Phone:</strong> {selectedAppointment.contactNumber}
                    </p>
                    <p>
                      <strong>Email:</strong> {selectedAppointment.email}
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Appointment Details</h4>
                  <div className="space-y-1 text-sm">
                    <p>
                      <strong>ID:</strong> {selectedAppointment.id}
                    </p>
                    <p>
                      <strong>Date:</strong> {new Date(selectedAppointment.date).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Time:</strong> {selectedAppointment.time}
                    </p>
                    <p>
                      <strong>Duration:</strong> {selectedAppointment.duration} minutes
                    </p>
                    <p>
                      <strong>Type:</strong> {selectedAppointment.type}
                    </p>
                    <p>
                      <strong>Priority:</strong> {selectedAppointment.priority}
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Doctor Information</h4>
                  <div className="space-y-1 text-sm">
                    <p>
                      <strong>Doctor:</strong> {selectedAppointment.doctorName}
                    </p>
                    <p>
                      <strong>Department:</strong> {selectedAppointment.department}
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Status</h4>
                  <Badge className={getStatusColor(selectedAppointment.status)}>
                    {getStatusIcon(selectedAppointment.status)}
                    <span className="ml-1">{selectedAppointment.status}</span>
                  </Badge>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Reason for Visit</h4>
                <p className="text-sm">{selectedAppointment.reason}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Notes</h4>
                <p className="text-sm">{selectedAppointment.notes}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
