"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  Download,
  Users,
  Phone,
  Mail,
  MapPin,
  Calendar,
  FileText,
} from "lucide-react"

// Mock patient data
const patients = [
  {
    id: "P001",
    name: "John Smith",
    age: 45,
    gender: "Male",
    phone: "(555) 123-4567",
    email: "john.smith@email.com",
    address: "123 Main St, City, State",
    bloodType: "O+",
    condition: "Hypertension",
    doctor: "Dr. Wilson",
    lastVisit: "2024-01-15",
    nextAppointment: "2024-01-25",
    status: "Active",
    avatar: "JS",
    insurance: "Blue Cross",
    emergencyContact: "Jane Smith - (555) 987-6543",
  },
  {
    id: "P002",
    name: "Sarah Johnson",
    age: 32,
    gender: "Female",
    phone: "(555) 234-5678",
    email: "sarah.j@email.com",
    address: "456 Oak Ave, City, State",
    bloodType: "A+",
    condition: "Diabetes Type 2",
    doctor: "Dr. Brown",
    lastVisit: "2024-01-10",
    nextAppointment: "2024-01-28",
    status: "Monitoring",
    avatar: "SJ",
    insurance: "Aetna",
    emergencyContact: "Mike Johnson - (555) 876-5432",
  },
  {
    id: "P003",
    name: "Mike Davis",
    age: 28,
    gender: "Male",
    phone: "(555) 345-6789",
    email: "mike.davis@email.com",
    address: "789 Pine St, City, State",
    bloodType: "B+",
    condition: "Fracture Recovery",
    doctor: "Dr. Lee",
    lastVisit: "2024-01-13",
    nextAppointment: "2024-01-30",
    status: "Recovering",
    avatar: "MD",
    insurance: "Cigna",
    emergencyContact: "Lisa Davis - (555) 765-4321",
  },
  {
    id: "P004",
    name: "Emily Wilson",
    age: 55,
    gender: "Female",
    phone: "(555) 456-7890",
    email: "emily.w@email.com",
    address: "321 Elm Dr, City, State",
    bloodType: "AB+",
    condition: "Cardiac Monitoring",
    doctor: "Dr. Smith",
    lastVisit: "2024-01-12",
    nextAppointment: "2024-02-05",
    status: "Scheduled",
    avatar: "EW",
    insurance: "United Healthcare",
    emergencyContact: "Robert Wilson - (555) 654-3210",
  },
  {
    id: "P005",
    name: "Robert Brown",
    age: 67,
    gender: "Male",
    phone: "(555) 567-8901",
    email: "robert.b@email.com",
    address: "654 Maple Ave, City, State",
    bloodType: "O-",
    condition: "Routine Check-up",
    doctor: "Dr. Johnson",
    lastVisit: "2024-01-08",
    nextAppointment: "2024-02-08",
    status: "Active",
    avatar: "RB",
    insurance: "Medicare",
    emergencyContact: "Mary Brown - (555) 543-2109",
  },
]

export default function AdminPatients() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [filterStatus, setFilterStatus] = useState("all")
  const [isAddPatientOpen, setIsAddPatientOpen] = useState(false)

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.condition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.doctor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || patient.status.toLowerCase() === filterStatus
    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Patient Management</h1>
          <p className="text-gray-600">Manage patient records, appointments, and medical information</p>
        </div>
        <Dialog open={isAddPatientOpen} onOpenChange={setIsAddPatientOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add New Patient
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Patient</DialogTitle>
              <DialogDescription>Enter patient information to create a new record</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="John" />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Smith" />
              </div>
              <div>
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input id="dateOfBirth" type="date" />
              </div>
              <div>
                <Label htmlFor="gender">Gender</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" placeholder="(555) 123-4567" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="john.smith@email.com" />
              </div>
              <div className="col-span-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" placeholder="123 Main St, City, State" />
              </div>
              <div>
                <Label htmlFor="bloodType">Blood Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select blood type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="A-">A-</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="B-">B-</SelectItem>
                    <SelectItem value="AB+">AB+</SelectItem>
                    <SelectItem value="AB-">AB-</SelectItem>
                    <SelectItem value="O+">O+</SelectItem>
                    <SelectItem value="O-">O-</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="insurance">Insurance Provider</Label>
                <Input id="insurance" placeholder="Blue Cross Blue Shield" />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsAddPatientOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsAddPatientOpen(false)}>Add Patient</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search patients by name, ID, condition, or doctor..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Patients</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="monitoring">Monitoring</SelectItem>
                <SelectItem value="recovering">Recovering</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Patient List */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Patient Records</CardTitle>
              <CardDescription>
                Showing {filteredPatients.length} of {patients.length} patients
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredPatients.map((patient) => (
                  <div
                    key={patient.id}
                    className={`p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedPatient?.id === patient.id ? "ring-2 ring-blue-500 bg-blue-50" : ""
                    }`}
                    onClick={() => setSelectedPatient(patient)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src="/placeholder.svg?height=48&width=48" />
                          <AvatarFallback className="bg-blue-100 text-blue-600">{patient.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-gray-900">{patient.name}</p>
                          <p className="text-sm text-gray-600">
                            {patient.id} • {patient.age}y • {patient.gender}
                          </p>
                          <p className="text-sm text-gray-600">{patient.condition}</p>
                          <p className="text-sm text-gray-600">Dr: {patient.doctor}</p>
                          <p className="text-xs text-gray-500">Last visit: {patient.lastVisit}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant={
                            patient.status === "Active"
                              ? "default"
                              : patient.status === "Monitoring"
                                ? "secondary"
                                : patient.status === "Recovering"
                                  ? "outline"
                                  : "secondary"
                          }
                        >
                          {patient.status}
                        </Badge>
                        <p className="text-xs text-gray-500 mt-1">Next: {patient.nextAppointment}</p>
                        <div className="flex space-x-1 mt-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <FileText className="h-4 w-4" />
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

        {/* Patient Details Sidebar */}
        <div>
          {selectedPatient ? (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Patient Details</CardTitle>
                  <CardDescription>{selectedPatient.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src="/placeholder.svg?height=64&width=64" />
                        <AvatarFallback className="bg-blue-100 text-blue-600 text-lg">
                          {selectedPatient.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-lg font-semibold">{selectedPatient.name}</h3>
                        <p className="text-sm text-gray-600">ID: {selectedPatient.id}</p>
                        <Badge variant="outline">{selectedPatient.status}</Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Age:</span>
                        <p className="font-medium">{selectedPatient.age}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Gender:</span>
                        <p className="font-medium">{selectedPatient.gender}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Blood Type:</span>
                        <p className="font-medium">{selectedPatient.bloodType}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Insurance:</span>
                        <p className="font-medium">{selectedPatient.insurance}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{selectedPatient.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{selectedPatient.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{selectedPatient.address}</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Medical Information</h4>
                      <div className="space-y-2 text-sm">
                        <p>
                          <strong>Condition:</strong> {selectedPatient.condition}
                        </p>
                        <p>
                          <strong>Assigned Doctor:</strong> {selectedPatient.doctor}
                        </p>
                        <p>
                          <strong>Last Visit:</strong> {selectedPatient.lastVisit}
                        </p>
                        <p>
                          <strong>Next Appointment:</strong> {selectedPatient.nextAppointment}
                        </p>
                        <p>
                          <strong>Emergency Contact:</strong> {selectedPatient.emergencyContact}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Appointment
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <FileText className="h-4 w-4 mr-2" />
                    View Medical Records
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Patient Info
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Download className="h-4 w-4 mr-2" />
                    Download Records
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Archive Patient
                  </Button>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p className="text-gray-500">Select a patient to view details</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
