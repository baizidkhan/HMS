"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
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
import { Calendar, Clock, Plus, Search, Pill } from "lucide-react"

// Mock notes data
const patientNotes = [
  {
    id: "N001",
    patient: "John Smith",
    patientId: "P001",
    date: "2024-01-20",
    time: "09:30 AM",
    type: "Progress Note",
    status: "Completed",
    content:
      "Patient reports feeling much better since starting Lisinopril. Blood pressure today: 135/85 (down from 150/95). No side effects reported. Continue current medication. Follow-up in 4 weeks.",
    diagnosis: "Hypertension",
    treatment: "Lisinopril 10mg daily",
    vitals: {
      bp: "135/85",
      hr: "72",
      temp: "98.6°F",
      weight: "180 lbs",
    },
    avatar: "JS",
  },
  {
    id: "N002",
    patient: "Sarah Johnson",
    patientId: "P002",
    date: "2024-01-19",
    time: "02:15 PM",
    type: "Consultation Note",
    status: "Completed",
    content:
      "New patient consultation for diabetes management. HbA1c: 7.8%. Started on Metformin 500mg twice daily. Provided dietary counseling and glucose monitoring instructions. Schedule follow-up in 6 weeks.",
    diagnosis: "Type 2 Diabetes",
    treatment: "Metformin 500mg BID, lifestyle modifications",
    vitals: {
      bp: "128/82",
      hr: "68",
      temp: "98.4°F",
      weight: "165 lbs",
    },
    avatar: "SJ",
  },
  {
    id: "N003",
    patient: "Michael Brown",
    patientId: "P003",
    date: "2024-01-18",
    time: "11:00 AM",
    type: "Follow-up Note",
    status: "Draft",
    content:
      "Follow-up for chronic back pain. Patient reports 40% improvement with physical therapy. Still experiencing morning stiffness. Recommend continuing PT and adding low-impact exercise routine.",
    diagnosis: "Chronic Lower Back Pain",
    treatment: "Physical therapy, NSAIDs as needed",
    vitals: {
      bp: "122/78",
      hr: "75",
      temp: "98.2°F",
      weight: "195 lbs",
    },
    avatar: "MB",
  },
]

const prescriptions = [
  {
    id: "RX001",
    patient: "John Smith",
    patientId: "P001",
    medication: "Lisinopril",
    dosage: "10mg",
    frequency: "Once daily",
    duration: "30 days",
    date: "2024-01-20",
    status: "Active",
    refills: 2,
  },
  {
    id: "RX002",
    patient: "Sarah Johnson",
    patientId: "P002",
    medication: "Metformin",
    dosage: "500mg",
    frequency: "Twice daily",
    duration: "90 days",
    date: "2024-01-19",
    status: "Active",
    refills: 5,
  },
  {
    id: "RX003",
    patient: "Michael Brown",
    patientId: "P003",
    medication: "Ibuprofen",
    dosage: "400mg",
    frequency: "As needed",
    duration: "14 days",
    date: "2024-01-18",
    status: "Active",
    refills: 0,
  },
]

export default function NotesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [isNewNoteOpen, setIsNewNoteOpen] = useState(false)
  const [isNewPrescriptionOpen, setIsNewPrescriptionOpen] = useState(false)

  const filteredNotes = patientNotes.filter((note) => {
    const matchesSearch =
      note.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "all" || note.type.toLowerCase().includes(selectedType.toLowerCase())
    return matchesSearch && matchesType
  })

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Notes & Prescriptions</h2>
        <div className="flex items-center space-x-2">
          <Dialog open={isNewNoteOpen} onOpenChange={setIsNewNoteOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Note
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Note</DialogTitle>
                <DialogDescription>Add a new patient note or observation.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="patient">Patient</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select patient" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="P001">John Smith</SelectItem>
                        <SelectItem value="P002">Sarah Johnson</SelectItem>
                        <SelectItem value="P003">Michael Brown</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="type">Note Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="progress">Progress Note</SelectItem>
                        <SelectItem value="consultation">Consultation Note</SelectItem>
                        <SelectItem value="followup">Follow-up Note</SelectItem>
                        <SelectItem value="discharge">Discharge Note</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="diagnosis">Diagnosis</Label>
                  <Input id="diagnosis" placeholder="Enter diagnosis" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="treatment">Treatment Plan</Label>
                  <Input id="treatment" placeholder="Enter treatment plan" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="content">Note Content</Label>
                  <Textarea id="content" placeholder="Enter detailed note content..." className="min-h-[120px]" />
                </div>
                <div className="grid grid-cols-4 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="bp">Blood Pressure</Label>
                    <Input id="bp" placeholder="120/80" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="hr">Heart Rate</Label>
                    <Input id="hr" placeholder="72" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="temp">Temperature</Label>
                    <Input id="temp" placeholder="98.6°F" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="weight">Weight</Label>
                    <Input id="weight" placeholder="180 lbs" />
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsNewNoteOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsNewNoteOpen(false)}>Save Note</Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isNewPrescriptionOpen} onOpenChange={setIsNewPrescriptionOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Pill className="mr-2 h-4 w-4" />
                New Prescription
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Prescription</DialogTitle>
                <DialogDescription>Add a new prescription for a patient.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="rx-patient">Patient</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select patient" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="P001">John Smith</SelectItem>
                      <SelectItem value="P002">Sarah Johnson</SelectItem>
                      <SelectItem value="P003">Michael Brown</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="medication">Medication</Label>
                  <Input id="medication" placeholder="Enter medication name" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="dosage">Dosage</Label>
                    <Input id="dosage" placeholder="10mg" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="frequency">Frequency</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="once">Once daily</SelectItem>
                        <SelectItem value="twice">Twice daily</SelectItem>
                        <SelectItem value="three">Three times daily</SelectItem>
                        <SelectItem value="asneeded">As needed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="duration">Duration</Label>
                    <Input id="duration" placeholder="30 days" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="refills">Refills</Label>
                    <Input id="refills" type="number" placeholder="2" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="instructions">Instructions</Label>
                  <Textarea
                    id="instructions"
                    placeholder="Special instructions for the patient..."
                    className="min-h-[80px]"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsNewPrescriptionOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsNewPrescriptionOpen(false)}>Create Prescription</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="notes" className="space-y-4">
        <TabsList>
          <TabsTrigger value="notes">Patient Notes</TabsTrigger>
          <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
        </TabsList>

        <TabsContent value="notes" className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="progress">Progress Notes</SelectItem>
                <SelectItem value="consultation">Consultation</SelectItem>
                <SelectItem value="followup">Follow-up</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4">
            {filteredNotes.map((note) => (
              <Card key={note.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarFallback>{note.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{note.patient}</CardTitle>
                        <CardDescription>
                          Patient ID: {note.patientId} • {note.diagnosis}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={note.status === "Completed" ? "default" : "secondary"}>{note.status}</Badge>
                      <Badge variant="outline">{note.type}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Calendar className="mr-1 h-4 w-4" />
                        {note.date}
                      </div>
                      <div className="flex items-center">
                        <Clock className="mr-1 h-4 w-4" />
                        {note.time}
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4 p-4 bg-muted/50 rounded-lg">
                      <div className="text-center">
                        <div className="text-sm font-medium">BP</div>
                        <div className="text-lg">{note.vitals.bp}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium">HR</div>
                        <div className="text-lg">{note.vitals.hr}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium">Temp</div>
                        <div className="text-lg">{note.vitals.temp}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium">Weight</div>
                        <div className="text-lg">{note.vitals.weight}</div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Clinical Notes</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{note.content}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-1">Treatment Plan</h4>
                        <p className="text-sm text-muted-foreground">{note.treatment}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="prescriptions" className="space-y-4">
          <div className="grid gap-4">
            {prescriptions.map((prescription) => (
              <Card key={prescription.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-blue-100 rounded-full">
                        <Pill className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{prescription.medication}</CardTitle>
                        <CardDescription>
                          {prescription.patient} • Patient ID: {prescription.patientId}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge variant={prescription.status === "Active" ? "default" : "secondary"}>
                      {prescription.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Dosage</div>
                      <div className="text-lg font-semibold">{prescription.dosage}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Frequency</div>
                      <div className="text-lg font-semibold">{prescription.frequency}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Duration</div>
                      <div className="text-lg font-semibold">{prescription.duration}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Refills</div>
                      <div className="text-lg font-semibold">{prescription.refills} remaining</div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Prescribed on {prescription.date}</span>
                      <span>Prescription ID: {prescription.id}</span>
                    </div>
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
