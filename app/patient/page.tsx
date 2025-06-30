"use client"

import { Label } from "@/components/ui/label"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, FileText, Pill, Heart, Activity, Download, Phone, Mail, MapPin, Bell, Settings } from "lucide-react"
import Link from "next/link"

// Mock patient data
const patientData = {
  name: "John Smith",
  id: "P001",
  dateOfBirth: "1978-05-15",
  gender: "Male",
  bloodType: "O+",
  phone: "(555) 123-4567",
  email: "john.smith@email.com",
  address: "123 Main St, City, State 12345",
  emergencyContact: {
    name: "Jane Smith",
    relation: "Spouse",
    phone: "(555) 987-6543",
  },
  insurance: {
    provider: "Blue Cross Blue Shield",
    policyNumber: "BC123456789",
    groupNumber: "GRP001",
  },
}

const upcomingAppointments = [
  {
    id: "A001",
    doctor: "Dr. James Wilson",
    specialty: "Cardiology",
    date: "2024-01-25",
    time: "10:00 AM",
    type: "Follow-up",
    location: "Room 205",
    status: "Confirmed",
  },
  {
    id: "A002",
    doctor: "Dr. Sarah Brown",
    specialty: "General Medicine",
    date: "2024-02-15",
    time: "2:30 PM",
    type: "Annual Check-up",
    location: "Room 101",
    status: "Scheduled",
  },
]

const medicalHistory = [
  {
    date: "2024-01-15",
    doctor: "Dr. Wilson",
    diagnosis: "Hypertension",
    treatment: "Prescribed Lisinopril 10mg daily",
    notes: "Patient responding well to medication. BP: 135/85",
  },
  {
    date: "2023-12-10",
    doctor: "Dr. Brown",
    diagnosis: "Annual Physical",
    treatment: "Routine blood work ordered",
    notes: "All vitals normal. Continue current medications.",
  },
  {
    date: "2023-08-22",
    doctor: "Dr. Lee",
    diagnosis: "Minor Fracture",
    treatment: "Cast applied, physical therapy recommended",
    notes: "Healing well. Cast removed after 6 weeks.",
  },
]

const currentMedications = [
  {
    name: "Lisinopril",
    dosage: "10mg",
    frequency: "Once daily",
    prescribedBy: "Dr. Wilson",
    startDate: "2024-01-15",
    instructions: "Take with food",
  },
  {
    name: "Vitamin D3",
    dosage: "1000 IU",
    frequency: "Once daily",
    prescribedBy: "Dr. Brown",
    startDate: "2023-12-10",
    instructions: "Take with breakfast",
  },
]

const labResults = [
  {
    date: "2024-01-15",
    test: "Complete Blood Count",
    status: "Normal",
    doctor: "Dr. Wilson",
    results: "All values within normal range",
  },
  {
    date: "2024-01-15",
    test: "Lipid Panel",
    status: "Attention",
    doctor: "Dr. Wilson",
    results: "Cholesterol slightly elevated - 210 mg/dL",
  },
  {
    date: "2023-12-10",
    test: "Blood Pressure",
    status: "Normal",
    doctor: "Dr. Brown",
    results: "120/80 mmHg",
  },
]

const vitals = {
  bloodPressure: "135/85",
  heartRate: "72 bpm",
  temperature: "98.6°F",
  weight: "180 lbs",
  height: "5'10\"",
  bmi: "25.8",
}

export default function PatientPortal() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Heart className="h-8 w-8 text-blue-600" />
                <div>
                  <span className="text-xl font-bold text-gray-900">Patient Portal</span>
                  <p className="text-sm text-gray-600">Welcome back, {patientData.name}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="icon">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
              <Link href="/">
                <Button variant="outline">Logout</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Patient Info Card */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center space-x-6">
              <Avatar className="h-20 w-20">
                <AvatarImage src="/placeholder.svg?height=80&width=80" />
                <AvatarFallback className="bg-blue-100 text-blue-600 text-xl">
                  {patientData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900">{patientData.name}</h2>
                <p className="text-gray-600">Patient ID: {patientData.id}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  <div>
                    <p className="text-sm text-gray-600">Date of Birth</p>
                    <p className="font-medium">{new Date(patientData.dateOfBirth).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Gender</p>
                    <p className="font-medium">{patientData.gender}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Blood Type</p>
                    <p className="font-medium">{patientData.bloodType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Insurance</p>
                    <p className="font-medium">{patientData.insurance.provider}</p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <Button>
                  <Calendar className="h-4 w-4 mr-2" />
                  Book Appointment
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="medical-history">Medical History</TabsTrigger>
            <TabsTrigger value="medications">Medications</TabsTrigger>
            <TabsTrigger value="lab-results">Lab Results</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {/* Upcoming Appointments */}
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Appointments</CardTitle>
                    <CardDescription>Your scheduled medical appointments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {upcomingAppointments.map((appointment) => (
                        <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className="bg-blue-100 p-2 rounded-lg">
                              <Calendar className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{appointment.doctor}</p>
                              <p className="text-sm text-gray-600">{appointment.specialty}</p>
                              <p className="text-sm text-gray-600">
                                {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                              </p>
                              <p className="text-sm text-gray-600">{appointment.location}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge variant={appointment.status === "Confirmed" ? "default" : "secondary"}>
                              {appointment.status}
                            </Badge>
                            <p className="text-sm text-gray-600 mt-1">{appointment.type}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Medical History */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Medical History</CardTitle>
                    <CardDescription>Your latest medical visits and treatments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {medicalHistory.slice(0, 3).map((record, index) => (
                        <div key={index} className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-gray-900">{record.diagnosis}</h4>
                            <span className="text-sm text-gray-600">{record.date}</span>
                          </div>
                          <p className="text-sm text-gray-700 mb-2">
                            <strong>Doctor:</strong> {record.doctor}
                          </p>
                          <p className="text-sm text-gray-700 mb-2">
                            <strong>Treatment:</strong> {record.treatment}
                          </p>
                          <p className="text-sm text-gray-700">
                            <strong>Notes:</strong> {record.notes}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Current Vitals */}
                <Card>
                  <CardHeader>
                    <CardTitle>Current Vitals</CardTitle>
                    <CardDescription>Latest recorded measurements</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-red-50 rounded-lg">
                        <Heart className="h-4 w-4 mx-auto mb-1 text-red-600" />
                        <p className="text-xs text-gray-600">Blood Pressure</p>
                        <p className="font-bold">{vitals.bloodPressure}</p>
                      </div>
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <Activity className="h-4 w-4 mx-auto mb-1 text-blue-600" />
                        <p className="text-xs text-gray-600">Heart Rate</p>
                        <p className="font-bold">{vitals.heartRate}</p>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <p className="text-xs text-gray-600">Temperature</p>
                        <p className="font-bold">{vitals.temperature}</p>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <p className="text-xs text-gray-600">Weight</p>
                        <p className="font-bold">{vitals.weight}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Current Medications */}
                <Card>
                  <CardHeader>
                    <CardTitle>Current Medications</CardTitle>
                    <CardDescription>Active prescriptions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {currentMedications.map((medication, index) => (
                        <div key={index} className="p-3 bg-gray-50 rounded-lg">
                          <p className="font-medium text-gray-900">{medication.name}</p>
                          <p className="text-sm text-gray-600">
                            {medication.dosage} - {medication.frequency}
                          </p>
                          <p className="text-xs text-gray-500">Prescribed by {medication.prescribedBy}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Calendar className="h-4 w-4 mr-2" />
                      Book Appointment
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <FileText className="h-4 w-4 mr-2" />
                      Request Records
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Pill className="h-4 w-4 mr-2" />
                      Refill Prescription
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Phone className="h-4 w-4 mr-2" />
                      Contact Doctor
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Appointments Tab */}
          <TabsContent value="appointments" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>My Appointments</CardTitle>
                    <CardDescription>View and manage your appointments</CardDescription>
                  </div>
                  <Button>
                    <Calendar className="h-4 w-4 mr-2" />
                    Book New Appointment
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment) => (
                    <div key={appointment.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="bg-blue-100 p-3 rounded-lg">
                            <Calendar className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">{appointment.doctor}</h3>
                            <p className="text-sm text-gray-600">{appointment.specialty}</p>
                            <p className="text-sm text-gray-600">
                              {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                            </p>
                            <p className="text-sm text-gray-600">{appointment.location}</p>
                            <p className="text-sm text-gray-600">{appointment.type}</p>
                          </div>
                        </div>
                        <div className="text-right space-y-2">
                          <Badge variant={appointment.status === "Confirmed" ? "default" : "secondary"}>
                            {appointment.status}
                          </Badge>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              Reschedule
                            </Button>
                            <Button variant="outline" size="sm">
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Medical History Tab */}
          <TabsContent value="medical-history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Medical History</CardTitle>
                <CardDescription>Complete record of your medical visits and treatments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {medicalHistory.map((record, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-900">{record.diagnosis}</h4>
                        <span className="text-sm text-gray-600">{record.date}</span>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-700 mb-2">
                            <strong>Doctor:</strong> {record.doctor}
                          </p>
                          <p className="text-sm text-gray-700">
                            <strong>Treatment:</strong> {record.treatment}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-700">
                            <strong>Notes:</strong> {record.notes}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Medications Tab */}
          <TabsContent value="medications" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>My Medications</CardTitle>
                    <CardDescription>Current and past prescriptions</CardDescription>
                  </div>
                  <Button variant="outline">
                    <Pill className="h-4 w-4 mr-2" />
                    Request Refill
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentMedications.map((medication, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {medication.name} {medication.dosage}
                          </h4>
                          <p className="text-sm text-gray-600">{medication.frequency}</p>
                          <p className="text-sm text-gray-600">Prescribed by {medication.prescribedBy}</p>
                          <p className="text-sm text-gray-600">Started: {medication.startDate}</p>
                          <p className="text-sm text-gray-600">Instructions: {medication.instructions}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant="default">Active</Badge>
                          <div className="mt-2">
                            <Button variant="outline" size="sm">
                              Refill
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Lab Results Tab */}
          <TabsContent value="lab-results" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Lab Results</CardTitle>
                    <CardDescription>Test results and reports</CardDescription>
                  </div>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {labResults.map((result, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">{result.test}</h4>
                          <p className="text-sm text-gray-600">Ordered by {result.doctor}</p>
                          <p className="text-sm text-gray-600">Date: {result.date}</p>
                          <p className="text-sm text-gray-700 mt-2">{result.results}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant={result.status === "Normal" ? "default" : "destructive"}>
                            {result.status}
                          </Badge>
                          <div className="mt-2">
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Your basic information and contact details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>First Name</Label>
                      <p className="font-medium">{patientData.name.split(" ")[0]}</p>
                    </div>
                    <div>
                      <Label>Last Name</Label>
                      <p className="font-medium">{patientData.name.split(" ")[1]}</p>
                    </div>
                    <div>
                      <Label>Date of Birth</Label>
                      <p className="font-medium">{new Date(patientData.dateOfBirth).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <Label>Gender</Label>
                      <p className="font-medium">{patientData.gender}</p>
                    </div>
                    <div>
                      <Label>Blood Type</Label>
                      <p className="font-medium">{patientData.bloodType}</p>
                    </div>
                    <div>
                      <Label>Patient ID</Label>
                      <p className="font-medium">{patientData.id}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{patientData.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{patientData.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{patientData.address}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Emergency Contact & Insurance</CardTitle>
                  <CardDescription>Important contact and insurance information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Emergency Contact</h4>
                    <div className="space-y-2">
                      <p>
                        <strong>Name:</strong> {patientData.emergencyContact.name}
                      </p>
                      <p>
                        <strong>Relationship:</strong> {patientData.emergencyContact.relation}
                      </p>
                      <p>
                        <strong>Phone:</strong> {patientData.emergencyContact.phone}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Insurance Information</h4>
                    <div className="space-y-2">
                      <p>
                        <strong>Provider:</strong> {patientData.insurance.provider}
                      </p>
                      <p>
                        <strong>Policy Number:</strong> {patientData.insurance.policyNumber}
                      </p>
                      <p>
                        <strong>Group Number:</strong> {patientData.insurance.groupNumber}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
