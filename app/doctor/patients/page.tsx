"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Filter,
  FileText,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Heart,
  Activity,
  Pill,
  Download,
  Eye,
  Users,
} from "lucide-react"
import Link from "next/link"

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
    lastVisit: "2024-01-15",
    nextAppointment: "2024-01-25",
    status: "Active",
    avatar: "JS",
    medicalHistory: [
      {
        date: "2024-01-15",
        diagnosis: "Hypertension",
        treatment: "Prescribed Lisinopril 10mg daily",
        notes: "Patient responding well to medication. BP: 135/85",
      },
      {
        date: "2023-12-10",
        diagnosis: "Annual Physical",
        treatment: "Routine blood work ordered",
        notes: "All vitals normal. Continue current medications.",
      },
    ],
    vitals: {
      bloodPressure: "135/85",
      heartRate: "72 bpm",
      temperature: "98.6°F",
      weight: "180 lbs",
      height: "5'10\"",
    },
    prescriptions: [
      {
        medication: "Lisinopril",
        dosage: "10mg",
        frequency: "Once daily",
        startDate: "2024-01-15",
        status: "Active",
      },
    ],
    familyHistory: [
      { relation: "Father", condition: "Heart Disease", age: "65" },
      { relation: "Mother", condition: "Diabetes", age: "70" },
    ],
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
    lastVisit: "2024-01-10",
    nextAppointment: "2024-01-28",
    status: "Monitoring",
    avatar: "SJ",
    medicalHistory: [
      {
        date: "2024-01-10",
        diagnosis: "Diabetes Type 2",
        treatment: "Metformin 500mg twice daily",
        notes: "HbA1c: 7.2%. Dietary counseling provided.",
      },
    ],
    vitals: {
      bloodPressure: "120/80",
      heartRate: "68 bpm",
      temperature: "98.4°F",
      weight: "145 lbs",
      height: "5'6\"",
    },
    prescriptions: [
      {
        medication: "Metformin",
        dosage: "500mg",
        frequency: "Twice daily",
        startDate: "2024-01-10",
        status: "Active",
      },
    ],
    familyHistory: [{ relation: "Mother", condition: "Diabetes", age: "58" }],
  },
]

const documents = [
  { id: "D001", patientId: "P001", type: "Lab Results", date: "2024-01-15", title: "Blood Panel" },
  { id: "D002", patientId: "P001", type: "X-Ray", date: "2024-01-10", title: "Chest X-Ray" },
  { id: "D003", patientId: "P002", type: "Lab Results", date: "2024-01-10", title: "HbA1c Test" },
]

export default function DoctorPatients() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [filterCondition, setFilterCondition] = useState("all")

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterCondition === "all" || patient.condition.toLowerCase().includes(filterCondition)
    return matchesSearch && matchesFilter
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/doctor" className="flex items-center space-x-2">
                <Users className="h-8 w-8 text-blue-600" />
                <div>
                  <span className="text-xl font-bold text-gray-900">Patient Records</span>
                  <p className="text-sm text-gray-600">Search and manage patient information</p>
                </div>
              </Link>
            </div>
            <Link href="/doctor">
              <Button variant="outline">Back to Dashboard</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search patients by name, ID, or condition..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={filterCondition} onValueChange={setFilterCondition}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Conditions</SelectItem>
                  <SelectItem value="hypertension">Hypertension</SelectItem>
                  <SelectItem value="diabetes">Diabetes</SelectItem>
                  <SelectItem value="cardiac">Cardiac</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Patient List */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>My Patients</CardTitle>
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
                                  : "outline"
                            }
                          >
                            {patient.status}
                          </Badge>
                          <p className="text-xs text-gray-500 mt-1">Next: {patient.nextAppointment}</p>
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
                          <AvatarImage src="/placeholder.svg?height=48&width=48" />
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
                          <span className="text-gray-600">Condition:</span>
                          <p className="font-medium">{selectedPatient.condition}</p>
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
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Current Vitals</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="text-center p-3 bg-red-50 rounded-lg">
                        <Heart className="h-4 w-4 mx-auto mb-1 text-red-600" />
                        <p className="text-xs text-gray-600">Blood Pressure</p>
                        <p className="font-bold">{selectedPatient.vitals.bloodPressure}</p>
                      </div>
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <Activity className="h-4 w-4 mx-auto mb-1 text-blue-600" />
                        <p className="text-xs text-gray-600">Heart Rate</p>
                        <p className="font-bold">{selectedPatient.vitals.heartRate}</p>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <p className="text-xs text-gray-600">Temperature</p>
                        <p className="font-bold">{selectedPatient.vitals.temperature}</p>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <p className="text-xs text-gray-600">Weight</p>
                        <p className="font-bold">{selectedPatient.vitals.weight}</p>
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
                      <FileText className="h-4 w-4 mr-2" />
                      Add Note
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Pill className="h-4 w-4 mr-2" />
                      Prescribe Medication
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Appointment
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Download className="h-4 w-4 mr-2" />
                      Download Records
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

        {/* Detailed Patient View */}
        {selectedPatient && (
          <Card className="mt-6">
            <CardContent className="p-6">
              <Tabs defaultValue="history" className="space-y-6">
                <TabsList>
                  <TabsTrigger value="history">Medical History</TabsTrigger>
                  <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                  <TabsTrigger value="family">Family History</TabsTrigger>
                </TabsList>

                <TabsContent value="history" className="space-y-4">
                  <div className="space-y-4">
                    {selectedPatient.medicalHistory.map((record, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900">{record.diagnosis}</h4>
                          <span className="text-sm text-gray-600">{record.date}</span>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">
                          <strong>Treatment:</strong> {record.treatment}
                        </p>
                        <p className="text-sm text-gray-700">
                          <strong>Notes:</strong> {record.notes}
                        </p>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="prescriptions" className="space-y-4">
                  <div className="space-y-4">
                    {selectedPatient.prescriptions.map((prescription, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-gray-900">
                              {prescription.medication} {prescription.dosage}
                            </h4>
                            <p className="text-sm text-gray-600">{prescription.frequency}</p>
                            <p className="text-sm text-gray-600">Started: {prescription.startDate}</p>
                          </div>
                          <Badge variant={prescription.status === "Active" ? "default" : "secondary"}>
                            {prescription.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="documents" className="space-y-4">
                  <div className="space-y-4">
                    {documents
                      .filter((doc) => doc.patientId === selectedPatient.id)
                      .map((document) => (
                        <div key={document.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <FileText className="h-5 w-5 text-blue-600" />
                            <div>
                              <p className="font-medium text-gray-900">{document.title}</p>
                              <p className="text-sm text-gray-600">
                                {document.type} • {document.date}
                              </p>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                </TabsContent>

                <TabsContent value="family" className="space-y-4">
                  <div className="space-y-4">
                    {selectedPatient.familyHistory.map((family, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">{family.relation}</p>
                            <p className="text-sm text-gray-600">{family.condition}</p>
                          </div>
                          <span className="text-sm text-gray-600">Age: {family.age}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
