"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { UserCheck, Plus, Search, Filter, Download, Edit, Trash2, Phone, Mail, Calendar, Users } from "lucide-react"

// Mock doctors data
const doctors = [
  {
    id: "D001",
    name: "Dr. James Wilson",
    specialty: "Cardiology",
    email: "j.wilson@hospital.com",
    phone: "(555) 123-4567",
    department: "Cardiology",
    experience: "15 years",
    education: "MD - Harvard Medical School",
    license: "MD123456",
    status: "Active",
    patients: 145,
    rating: 4.8,
    avatar: "JW",
    schedule: {
      monday: "9:00 AM - 5:00 PM",
      tuesday: "9:00 AM - 5:00 PM",
      wednesday: "9:00 AM - 1:00 PM",
      thursday: "9:00 AM - 5:00 PM",
      friday: "9:00 AM - 3:00 PM",
    },
  },
  {
    id: "D002",
    name: "Dr. Sarah Brown",
    specialty: "General Medicine",
    email: "s.brown@hospital.com",
    phone: "(555) 234-5678",
    department: "Internal Medicine",
    experience: "12 years",
    education: "MD - Johns Hopkins",
    license: "MD234567",
    status: "Active",
    patients: 198,
    rating: 4.9,
    avatar: "SB",
    schedule: {
      monday: "8:00 AM - 4:00 PM",
      tuesday: "8:00 AM - 4:00 PM",
      wednesday: "8:00 AM - 4:00 PM",
      thursday: "8:00 AM - 4:00 PM",
      friday: "8:00 AM - 2:00 PM",
    },
  },
  {
    id: "D003",
    name: "Dr. Michael Lee",
    specialty: "Orthopedics",
    email: "m.lee@hospital.com",
    phone: "(555) 345-6789",
    department: "Orthopedics",
    experience: "18 years",
    education: "MD - Stanford Medical",
    license: "MD345678",
    status: "Active",
    patients: 87,
    rating: 4.7,
    avatar: "ML",
    schedule: {
      monday: "10:00 AM - 6:00 PM",
      tuesday: "10:00 AM - 6:00 PM",
      wednesday: "Off",
      thursday: "10:00 AM - 6:00 PM",
      friday: "10:00 AM - 4:00 PM",
    },
  },
  {
    id: "D004",
    name: "Dr. Jennifer Adams",
    specialty: "Pediatrics",
    email: "j.adams@hospital.com",
    phone: "(555) 456-7890",
    department: "Pediatrics",
    experience: "10 years",
    education: "MD - UCLA Medical",
    license: "MD456789",
    status: "On Leave",
    patients: 156,
    rating: 4.6,
    avatar: "JA",
    schedule: {
      monday: "Off",
      tuesday: "Off",
      wednesday: "Off",
      thursday: "Off",
      friday: "Off",
    },
  },
]

const departments = ["Cardiology", "Internal Medicine", "Orthopedics", "Pediatrics", "Neurology", "Emergency"]

export default function DoctorsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [isAddDoctorOpen, setIsAddDoctorOpen] = useState(false)
  const [selectedDoctor, setSelectedDoctor] = useState(null)

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.department.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = selectedDepartment === "all" || doctor.department === selectedDepartment
    return matchesSearch && matchesDepartment
  })

  const exportDoctors = () => {
    const csvContent = [
      ["ID", "Name", "Specialty", "Department", "Email", "Phone", "Status", "Patients"].join(","),
      ...filteredDoctors.map((doctor) =>
        [
          doctor.id,
          doctor.name,
          doctor.specialty,
          doctor.department,
          doctor.email,
          doctor.phone,
          doctor.status,
          doctor.patients,
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "doctors.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Doctor Management</h1>
          <p className="text-gray-600">Manage doctors, schedules, and assignments</p>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={exportDoctors}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Dialog open={isAddDoctorOpen} onOpenChange={setIsAddDoctorOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Doctor
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Doctor</DialogTitle>
                <DialogDescription>Enter the doctor's information to add them to the system.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Dr. John Doe" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="specialty">Specialty</Label>
                    <Input id="specialty" placeholder="Cardiology" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="doctor@hospital.com" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" placeholder="(555) 123-4567" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="department">Department</Label>
                    <Select>
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
                  <div className="grid gap-2">
                    <Label htmlFor="license">License Number</Label>
                    <Input id="license" placeholder="MD123456" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="education">Education</Label>
                  <Input id="education" placeholder="MD - Medical School" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="experience">Experience</Label>
                  <Input id="experience" placeholder="10 years" />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddDoctorOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAddDoctorOpen(false)}>Add Doctor</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Doctors</p>
                <p className="text-2xl font-bold text-gray-900">{doctors.length}</p>
              </div>
              <UserCheck className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Doctors</p>
                <p className="text-2xl font-bold text-gray-900">
                  {doctors.filter((d) => d.status === "Active").length}
                </p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Patients</p>
                <p className="text-2xl font-bold text-gray-900">{doctors.reduce((sum, d) => sum + d.patients, 0)}</p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Departments</p>
                <p className="text-2xl font-bold text-gray-900">{departments.length}</p>
              </div>
              <Calendar className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search doctors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="All Departments" />
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
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          More Filters
        </Button>
      </div>

      {/* Doctors Table */}
      <Card>
        <CardHeader>
          <CardTitle>Doctors Directory</CardTitle>
          <CardDescription>Complete list of doctors and their information</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Doctor</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Patients</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDoctors.map((doctor) => (
                <TableRow key={doctor.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" />
                        <AvatarFallback>{doctor.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{doctor.name}</p>
                        <p className="text-sm text-gray-600">{doctor.specialty}</p>
                        <p className="text-xs text-gray-500">{doctor.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{doctor.department}</p>
                      <p className="text-sm text-gray-600">{doctor.experience}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm">
                        <Mail className="h-3 w-3 mr-1" />
                        {doctor.email}
                      </div>
                      <div className="flex items-center text-sm">
                        <Phone className="h-3 w-3 mr-1" />
                        {doctor.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-center">
                      <p className="font-bold text-lg">{doctor.patients}</p>
                      <p className="text-xs text-gray-600">patients</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-center">
                      <p className="font-bold">{doctor.rating}</p>
                      <p className="text-xs text-gray-600">★★★★★</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={doctor.status === "Active" ? "default" : "secondary"}>{doctor.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" onClick={() => setSelectedDoctor(doctor)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Doctor Details Dialog */}
      {selectedDoctor && (
        <Dialog open={!!selectedDoctor} onOpenChange={() => setSelectedDoctor(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Doctor Details - {selectedDoctor.name}</DialogTitle>
              <DialogDescription>Complete information and schedule</DialogDescription>
            </DialogHeader>
            <Tabs defaultValue="info" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="info">Information</TabsTrigger>
                <TabsTrigger value="schedule">Schedule</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
              </TabsList>
              <TabsContent value="info" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Full Name</Label>
                    <p className="font-medium">{selectedDoctor.name}</p>
                  </div>
                  <div>
                    <Label>Specialty</Label>
                    <p className="font-medium">{selectedDoctor.specialty}</p>
                  </div>
                  <div>
                    <Label>Department</Label>
                    <p className="font-medium">{selectedDoctor.department}</p>
                  </div>
                  <div>
                    <Label>License</Label>
                    <p className="font-medium">{selectedDoctor.license}</p>
                  </div>
                  <div>
                    <Label>Education</Label>
                    <p className="font-medium">{selectedDoctor.education}</p>
                  </div>
                  <div>
                    <Label>Experience</Label>
                    <p className="font-medium">{selectedDoctor.experience}</p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="schedule" className="space-y-4">
                <div className="grid gap-3">
                  {Object.entries(selectedDoctor.schedule).map(([day, hours]) => (
                    <div key={day} className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="font-medium capitalize">{day}</span>
                      <span className={hours === "Off" ? "text-gray-500" : "text-green-600"}>{hours}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="performance" className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <p className="text-2xl font-bold">{selectedDoctor.patients}</p>
                      <p className="text-sm text-gray-600">Total Patients</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <p className="text-2xl font-bold">{selectedDoctor.rating}</p>
                      <p className="text-sm text-gray-600">Rating</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <p className="text-2xl font-bold">98%</p>
                      <p className="text-sm text-gray-600">Attendance</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
