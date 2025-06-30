"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Phone, Mail, MapPin, Clock, Users, Building, Stethoscope, Calendar, Star } from "lucide-react"

// Mock data
const doctors = [
  {
    id: "D001",
    name: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    department: "Cardiology",
    phone: "+1 234-567-8901",
    email: "sarah.johnson@hospital.com",
    location: "Room 201, Building A",
    availability: "Mon-Fri 9:00 AM - 5:00 PM",
    status: "available",
    rating: 4.8,
    experience: "15 years",
  },
  {
    id: "D002",
    name: "Dr. Michael Chen",
    specialty: "Neurology",
    department: "Neurology",
    phone: "+1 234-567-8902",
    email: "michael.chen@hospital.com",
    location: "Room 305, Building B",
    availability: "Mon-Wed 8:00 AM - 4:00 PM",
    status: "busy",
    rating: 4.9,
    experience: "12 years",
  },
  {
    id: "D003",
    name: "Dr. Emily Davis",
    specialty: "Pediatrics",
    department: "Pediatrics",
    phone: "+1 234-567-8903",
    email: "emily.davis@hospital.com",
    location: "Room 102, Building C",
    availability: "Tue-Sat 10:00 AM - 6:00 PM",
    status: "available",
    rating: 4.7,
    experience: "8 years",
  },
]

const staff = [
  {
    id: "S001",
    name: "Jennifer Wilson",
    role: "Head Nurse",
    department: "Emergency",
    phone: "+1 234-567-8904",
    email: "jennifer.wilson@hospital.com",
    location: "Emergency Ward",
    shift: "Day Shift (7:00 AM - 7:00 PM)",
    status: "on-duty",
  },
  {
    id: "S002",
    name: "Robert Martinez",
    role: "Lab Technician",
    department: "Laboratory",
    phone: "+1 234-567-8905",
    email: "robert.martinez@hospital.com",
    location: "Lab Building, Floor 1",
    shift: "Morning Shift (6:00 AM - 2:00 PM)",
    status: "on-duty",
  },
  {
    id: "S003",
    name: "Lisa Thompson",
    role: "Pharmacist",
    department: "Pharmacy",
    phone: "+1 234-567-8906",
    email: "lisa.thompson@hospital.com",
    location: "Pharmacy, Ground Floor",
    shift: "Full Time (9:00 AM - 5:00 PM)",
    status: "off-duty",
  },
]

const departments = [
  {
    name: "Emergency",
    head: "Dr. James Wilson",
    location: "Ground Floor, Building A",
    phone: "+1 234-567-8900",
    extension: "911",
    capacity: "24 beds",
    status: "operational",
    staff: 15,
  },
  {
    name: "Cardiology",
    head: "Dr. Sarah Johnson",
    location: "2nd Floor, Building A",
    phone: "+1 234-567-8901",
    extension: "201",
    capacity: "12 beds",
    status: "operational",
    staff: 8,
  },
  {
    name: "Pediatrics",
    head: "Dr. Emily Davis",
    location: "1st Floor, Building C",
    phone: "+1 234-567-8903",
    extension: "102",
    capacity: "16 beds",
    status: "operational",
    staff: 10,
  },
  {
    name: "Laboratory",
    head: "Dr. Mark Anderson",
    location: "Basement, Building B",
    phone: "+1 234-567-8905",
    extension: "105",
    capacity: "N/A",
    status: "operational",
    staff: 6,
  },
]

export default function ReceptionistDirectoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("doctors")

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.department.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredStaff = staff.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.department.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredDepartments = departments.filter(
    (dept) =>
      dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.head.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800"
      case "busy":
        return "bg-red-100 text-red-800"
      case "on-duty":
        return "bg-blue-100 text-blue-800"
      case "off-duty":
        return "bg-gray-100 text-gray-800"
      case "operational":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Hospital Directory</h1>
        <p className="text-gray-600">Find doctors, staff, and department information</p>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search doctors, staff, or departments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Directory Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="doctors" className="flex items-center gap-2">
            <Stethoscope className="h-4 w-4" />
            Doctors
          </TabsTrigger>
          <TabsTrigger value="staff" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Staff
          </TabsTrigger>
          <TabsTrigger value="departments" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            Departments
          </TabsTrigger>
        </TabsList>

        {/* Doctors Tab */}
        <TabsContent value="doctors" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doctor) => (
              <Card key={doctor.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={`/placeholder.svg?height=48&width=48`} />
                        <AvatarFallback>{getInitials(doctor.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{doctor.name}</CardTitle>
                        <CardDescription>{doctor.specialty}</CardDescription>
                      </div>
                    </div>
                    <Badge className={getStatusColor(doctor.status)}>{doctor.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <Building className="h-4 w-4 text-gray-500" />
                    <span>{doctor.department}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span>{doctor.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span className="truncate">{doctor.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span>{doctor.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span>{doctor.availability}</span>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{doctor.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">{doctor.experience}</span>
                  </div>
                  <div className="flex space-x-2 pt-2">
                    <Button size="sm" className="flex-1">
                      <Phone className="h-4 w-4 mr-1" />
                      Call
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      <Calendar className="h-4 w-4 mr-1" />
                      Schedule
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Staff Tab */}
        <TabsContent value="staff" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStaff.map((member) => (
              <Card key={member.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={`/placeholder.svg?height=48&width=48`} />
                        <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{member.name}</CardTitle>
                        <CardDescription>{member.role}</CardDescription>
                      </div>
                    </div>
                    <Badge className={getStatusColor(member.status)}>{member.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <Building className="h-4 w-4 text-gray-500" />
                    <span>{member.department}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span>{member.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span className="truncate">{member.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span>{member.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span>{member.shift}</span>
                  </div>
                  <div className="flex space-x-2 pt-2">
                    <Button size="sm" className="flex-1">
                      <Phone className="h-4 w-4 mr-1" />
                      Call
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      <Mail className="h-4 w-4 mr-1" />
                      Email
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Departments Tab */}
        <TabsContent value="departments" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredDepartments.map((dept) => (
              <Card key={dept.name} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{dept.name}</CardTitle>
                      <CardDescription>Head: {dept.head}</CardDescription>
                    </div>
                    <Badge className={getStatusColor(dept.status)}>{dept.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span>{dept.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span>
                      {dept.phone} (Ext: {dept.extension})
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Building className="h-4 w-4 text-gray-500" />
                    <span>Capacity: {dept.capacity}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span>{dept.staff} Staff Members</span>
                  </div>
                  <div className="flex space-x-2 pt-2">
                    <Button size="sm" className="flex-1">
                      <Phone className="h-4 w-4 mr-1" />
                      Call Department
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      <MapPin className="h-4 w-4 mr-1" />
                      Directions
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
