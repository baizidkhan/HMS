"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Building, Plus, Search, Download, Users, UserCheck, Bed, Edit, Trash2 } from "lucide-react"

// Mock departments data
const departments = [
  {
    id: "DEPT-001",
    name: "Emergency Department",
    head: "Dr. Sarah Wilson",
    location: "Ground Floor, Wing A",
    capacity: 50,
    currentPatients: 38,
    staff: 25,
    doctors: 8,
    description: "24/7 emergency medical services and trauma care",
    phone: "(555) 911-0000",
    email: "emergency@hospital.com",
    status: "Active",
    budget: "$2,500,000",
    equipment: ["Defibrillators", "Ventilators", "X-Ray Machine", "CT Scanner"],
  },
  {
    id: "DEPT-002",
    name: "Cardiology",
    head: "Dr. James Wilson",
    location: "2nd Floor, Wing B",
    capacity: 30,
    currentPatients: 24,
    staff: 18,
    doctors: 6,
    description: "Comprehensive heart and cardiovascular care",
    phone: "(555) 234-5678",
    email: "cardiology@hospital.com",
    status: "Active",
    budget: "$1,800,000",
    equipment: ["ECG Machines", "Echocardiogram", "Cardiac Monitors", "Stress Test Equipment"],
  },
  {
    id: "DEPT-003",
    name: "Pediatrics",
    head: "Dr. Jennifer Adams",
    location: "3rd Floor, Wing C",
    capacity: 25,
    currentPatients: 15,
    staff: 20,
    doctors: 5,
    description: "Specialized medical care for infants, children, and adolescents",
    phone: "(555) 345-6789",
    email: "pediatrics@hospital.com",
    status: "Active",
    budget: "$1,200,000",
    equipment: ["Pediatric Monitors", "Incubators", "Nebulizers", "Growth Charts"],
  },
  {
    id: "DEPT-004",
    name: "Orthopedics",
    head: "Dr. Michael Lee",
    location: "1st Floor, Wing D",
    capacity: 20,
    currentPatients: 14,
    staff: 15,
    doctors: 4,
    description: "Bone, joint, and musculoskeletal system treatment",
    phone: "(555) 456-7890",
    email: "orthopedics@hospital.com",
    status: "Active",
    budget: "$1,500,000",
    equipment: ["X-Ray Machines", "MRI Scanner", "Surgical Tools", "Physical Therapy Equipment"],
  },
  {
    id: "DEPT-005",
    name: "Laboratory",
    head: "Dr. Lisa Chen",
    location: "Basement Level",
    capacity: 15,
    currentPatients: 0,
    staff: 12,
    doctors: 3,
    description: "Clinical laboratory services and diagnostic testing",
    phone: "(555) 567-8901",
    email: "lab@hospital.com",
    status: "Active",
    budget: "$800,000",
    equipment: ["Microscopes", "Centrifuges", "Analyzers", "Refrigeration Units"],
  },
]

export default function DepartmentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDepartmentOpen, setIsAddDepartmentOpen] = useState(false)
  const [selectedDepartment, setSelectedDepartment] = useState(null)

  const filteredDepartments = departments.filter(
    (dept) =>
      dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.head.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalCapacity = departments.reduce((sum, dept) => sum + dept.capacity, 0)
  const totalPatients = departments.reduce((sum, dept) => sum + dept.currentPatients, 0)
  const totalStaff = departments.reduce((sum, dept) => sum + dept.staff, 0)
  const totalDoctors = departments.reduce((sum, dept) => sum + dept.doctors, 0)

  const exportDepartments = () => {
    const csvContent = [
      ["ID", "Name", "Head", "Location", "Capacity", "Current Patients", "Staff", "Doctors"].join(","),
      ...filteredDepartments.map((dept) =>
        [
          dept.id,
          dept.name,
          dept.head,
          dept.location,
          dept.capacity,
          dept.currentPatients,
          dept.staff,
          dept.doctors,
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "departments.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Department Management</h1>
          <p className="text-gray-600">Manage hospital departments and their resources</p>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={exportDepartments}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Dialog open={isAddDepartmentOpen} onOpenChange={setIsAddDepartmentOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Department
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Department</DialogTitle>
                <DialogDescription>Create a new hospital department.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Department Name</Label>
                    <Input id="name" placeholder="Emergency Department" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="head">Department Head</Label>
                    <Input id="head" placeholder="Dr. John Doe" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" placeholder="Ground Floor, Wing A" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="capacity">Capacity</Label>
                    <Input id="capacity" type="number" placeholder="50" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" placeholder="(555) 123-4567" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="dept@hospital.com" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Department description and services..." />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="budget">Annual Budget</Label>
                  <Input id="budget" placeholder="$1,000,000" />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddDepartmentOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAddDepartmentOpen(false)}>Add Department</Button>
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
                <p className="text-sm font-medium text-gray-600">Total Departments</p>
                <p className="text-2xl font-bold text-gray-900">{departments.length}</p>
              </div>
              <Building className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Capacity</p>
                <p className="text-2xl font-bold text-gray-900">{totalCapacity}</p>
              </div>
              <Bed className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Current Patients</p>
                <p className="text-2xl font-bold text-gray-900">{totalPatients}</p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Staff</p>
                <p className="text-2xl font-bold text-gray-900">{totalStaff}</p>
              </div>
              <UserCheck className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search departments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Departments Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {filteredDepartments.map((department) => (
          <Card key={department.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Building className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{department.name}</CardTitle>
                    <CardDescription>{department.head}</CardDescription>
                  </div>
                </div>
                <Badge variant="default">{department.status}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-gray-600">{department.description}</p>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">{department.currentPatients}</p>
                    <p className="text-xs text-gray-600">Current Patients</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">{department.capacity}</p>
                    <p className="text-xs text-gray-600">Total Capacity</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Location</p>
                    <p className="font-medium">{department.location}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Budget</p>
                    <p className="font-medium">{department.budget}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Staff</p>
                    <p className="font-medium">{department.staff} members</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Doctors</p>
                    <p className="font-medium">{department.doctors} doctors</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="text-sm text-gray-600">
                    <p>📞 {department.phone}</p>
                    <p>✉️ {department.email}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => setSelectedDepartment(department)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Department Details Dialog */}
      {selectedDepartment && (
        <Dialog open={!!selectedDepartment} onOpenChange={() => setSelectedDepartment(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>{selectedDepartment.name} - Details</DialogTitle>
              <DialogDescription>Complete department information and equipment</DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Department Head</Label>
                  <p className="font-medium">{selectedDepartment.head}</p>
                </div>
                <div>
                  <Label>Location</Label>
                  <p className="font-medium">{selectedDepartment.location}</p>
                </div>
                <div>
                  <Label>Capacity</Label>
                  <p className="font-medium">{selectedDepartment.capacity} beds</p>
                </div>
                <div>
                  <Label>Current Patients</Label>
                  <p className="font-medium">{selectedDepartment.currentPatients}</p>
                </div>
                <div>
                  <Label>Total Staff</Label>
                  <p className="font-medium">{selectedDepartment.staff} members</p>
                </div>
                <div>
                  <Label>Doctors</Label>
                  <p className="font-medium">{selectedDepartment.doctors}</p>
                </div>
              </div>

              <div>
                <Label>Description</Label>
                <p className="text-sm text-gray-600 mt-1">{selectedDepartment.description}</p>
              </div>

              <div>
                <Label>Equipment</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedDepartment.equipment.map((item) => (
                    <Badge key={item} variant="outline">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Phone</Label>
                  <p className="font-medium">{selectedDepartment.phone}</p>
                </div>
                <div>
                  <Label>Email</Label>
                  <p className="font-medium">{selectedDepartment.email}</p>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
