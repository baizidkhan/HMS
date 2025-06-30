"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Label } from "@/components/ui/label"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from "recharts"
import {
  Search,
  Mail,
  MessageSquare,
  Phone,
  TrendingUp,
  TrendingDown,
  Users,
  AlertTriangle,
  Heart,
  Star,
  Send,
  Eye,
  Target,
  Activity,
} from "lucide-react"

// Mock data for patient tracking
const mockPatients = [
  {
    id: "P001",
    name: "Sarah Johnson",
    avatar: "/placeholder-user.jpg",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    visitFrequency: "Regular",
    totalVisits: 12,
    lastVisit: "2024-01-15",
    nextFollowUp: "2024-02-15",
    behaviorScore: 85,
    feedbackScore: 4.5,
    missedAppointments: 1,
    tag: "Loyal",
    priority: "Medium",
    engagementHistory: [
      { type: "Email", template: "Follow-up", date: "2024-01-10", status: "Opened" },
      { type: "SMS", template: "Reminder", date: "2024-01-14", status: "Delivered" },
      { type: "Phone", template: "Satisfaction", date: "2024-01-16", status: "Completed" },
    ],
  },
  {
    id: "P002",
    name: "Michael Chen",
    avatar: "/placeholder-user.jpg",
    email: "michael.chen@email.com",
    phone: "+1 (555) 234-5678",
    visitFrequency: "New",
    totalVisits: 2,
    lastVisit: "2024-01-20",
    nextFollowUp: "2024-02-20",
    behaviorScore: 65,
    feedbackScore: 4.0,
    missedAppointments: 0,
    tag: "Engaged",
    priority: "High",
    engagementHistory: [
      { type: "Email", template: "Welcome", date: "2024-01-18", status: "Opened" },
      { type: "SMS", template: "Health Tips", date: "2024-01-21", status: "Delivered" },
    ],
  },
  {
    id: "P003",
    name: "Emily Davis",
    avatar: "/placeholder-user.jpg",
    email: "emily.davis@email.com",
    phone: "+1 (555) 345-6789",
    visitFrequency: "Inactive",
    totalVisits: 8,
    lastVisit: "2023-11-15",
    nextFollowUp: "2024-02-01",
    behaviorScore: 35,
    feedbackScore: 3.0,
    missedAppointments: 3,
    tag: "At Risk",
    priority: "High",
    engagementHistory: [
      { type: "Email", template: "Re-engagement", date: "2024-01-05", status: "Not Opened" },
      { type: "SMS", template: "We Miss You", date: "2024-01-12", status: "Delivered" },
    ],
  },
  {
    id: "P004",
    name: "David Wilson",
    avatar: "/placeholder-user.jpg",
    email: "david.wilson@email.com",
    phone: "+1 (555) 456-7890",
    visitFrequency: "Regular",
    totalVisits: 15,
    lastVisit: "2024-01-18",
    nextFollowUp: "2024-02-18",
    behaviorScore: 92,
    feedbackScore: 5.0,
    missedAppointments: 0,
    tag: "Loyal",
    priority: "Low",
    engagementHistory: [
      { type: "Email", template: "Newsletter", date: "2024-01-01", status: "Opened" },
      { type: "Phone", template: "Follow-up", date: "2024-01-19", status: "Completed" },
    ],
  },
  {
    id: "P005",
    name: "Lisa Anderson",
    avatar: "/placeholder-user.jpg",
    email: "lisa.anderson@email.com",
    phone: "+1 (555) 567-8901",
    visitFrequency: "New",
    totalVisits: 1,
    lastVisit: "2024-01-22",
    nextFollowUp: "2024-02-22",
    behaviorScore: 55,
    feedbackScore: 3.5,
    missedAppointments: 0,
    tag: "Aware",
    priority: "Medium",
    engagementHistory: [{ type: "Email", template: "Welcome", date: "2024-01-22", status: "Opened" }],
  },
]

const retentionData = [
  { month: "Jul", retention: 78 },
  { month: "Aug", retention: 82 },
  { month: "Sep", retention: 75 },
  { month: "Oct", retention: 88 },
  { month: "Nov", retention: 85 },
  { month: "Dec", retention: 90 },
  { month: "Jan", retention: 87 },
]

const engagementData = [
  { type: "Email", sent: 245, opened: 180, clicked: 95 },
  { type: "SMS", sent: 189, delivered: 185, replied: 45 },
  { type: "Phone", sent: 67, completed: 52, followUp: 38 },
]

const messageTemplates = {
  email: [
    {
      id: "welcome",
      name: "Welcome Email",
      subject: "Welcome to Our Healthcare Family",
      content: "Dear {name}, welcome to our healthcare community...",
    },
    {
      id: "reminder",
      name: "Appointment Reminder",
      subject: "Upcoming Appointment Reminder",
      content: "Hi {name}, this is a reminder for your appointment on {date}...",
    },
    {
      id: "followup",
      name: "Follow-up Care",
      subject: "How Are You Feeling?",
      content: "Dear {name}, we hope you're feeling better after your recent visit...",
    },
    {
      id: "reengagement",
      name: "Re-engagement",
      subject: "We Miss You!",
      content: "Hi {name}, we noticed it's been a while since your last visit...",
    },
    {
      id: "newsletter",
      name: "Health Newsletter",
      subject: "Monthly Health Tips",
      content: "Dear {name}, here are this month's health tips and updates...",
    },
  ],
  sms: [
    {
      id: "reminder",
      name: "Appointment Reminder",
      content: "Hi {name}, reminder: appointment tomorrow at {time}. Reply CONFIRM or call us.",
    },
    { id: "health_tips", name: "Health Tips", content: "Hi {name}! Quick health tip: {tip}. Stay healthy!" },
    { id: "miss_you", name: "We Miss You", content: "Hi {name}, we miss you! Schedule your next visit: {link}" },
    {
      id: "feedback",
      name: "Feedback Request",
      content: "Hi {name}, how was your recent visit? Rate us 1-5 by replying.",
    },
  ],
  phone: [
    {
      id: "followup",
      name: "Follow-up Call",
      script: "Hi {name}, this is {caller} from {clinic}. How are you feeling after your recent visit?",
    },
    {
      id: "reengagement",
      name: "Re-engagement Call",
      script: "Hi {name}, we noticed it's been a while. We'd love to schedule your next check-up.",
    },
    {
      id: "satisfaction",
      name: "Satisfaction Survey",
      script: "Hi {name}, we'd appreciate your feedback on your recent experience with us.",
    },
  ],
}

export default function PatientTrackingPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTag, setSelectedTag] = useState("all")
  const [selectedFrequency, setSelectedFrequency] = useState("all")
  const [selectedPriority, setSelectedPriority] = useState("all")
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false)
  const [messageType, setMessageType] = useState("email")
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [customMessage, setCustomMessage] = useState("")

  const filteredPatients = mockPatients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTag = selectedTag === "all" || patient.tag.toLowerCase() === selectedTag.toLowerCase()
    const matchesFrequency =
      selectedFrequency === "all" || patient.visitFrequency.toLowerCase() === selectedFrequency.toLowerCase()
    const matchesPriority =
      selectedPriority === "all" || patient.priority.toLowerCase() === selectedPriority.toLowerCase()

    return matchesSearch && matchesTag && matchesFrequency && matchesPriority
  })

  const getTagColor = (tag) => {
    switch (tag) {
      case "Loyal":
        return "bg-green-100 text-green-800 border-green-200"
      case "Engaged":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "At Risk":
        return "bg-red-100 text-red-800 border-red-200"
      case "Aware":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getFrequencyIcon = (frequency) => {
    switch (frequency) {
      case "Regular":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "New":
        return <Star className="h-4 w-4 text-blue-600" />
      case "Inactive":
        return <TrendingDown className="h-4 w-4 text-red-600" />
      default:
        return <Activity className="h-4 w-4 text-gray-600" />
    }
  }

  const handleViewPatient = (patient) => {
    setSelectedPatient(patient)
    setIsViewDialogOpen(true)
  }

  const handleSendMessage = (patient) => {
    setSelectedPatient(patient)
    setIsMessageDialogOpen(true)
  }

  const handleSendMessageSubmit = () => {
    console.log("Sending message:", {
      patient: selectedPatient?.name,
      messageType,
      selectedTemplate,
      customMessage,
    })
    setIsMessageDialogOpen(false)
    setSelectedTemplate("")
    setCustomMessage("")
    setMessageType("email")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Patient Tracking</h1>
          <p className="text-gray-600">Monitor patient engagement and behavior insights</p>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tracked</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">At Risk</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">89</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-600">+5%</span> needs attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Loyal Patients</CardTitle>
            <Heart className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">456</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8%</span> retention rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Behavior Score</CardTitle>
            <Target className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">74.2</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+3.2</span> points this month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Patient Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search patients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Select value={selectedTag} onValueChange={setSelectedTag}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Tag" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tags</SelectItem>
                <SelectItem value="loyal">Loyal</SelectItem>
                <SelectItem value="engaged">Engaged</SelectItem>
                <SelectItem value="at risk">At Risk</SelectItem>
                <SelectItem value="aware">Aware</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedFrequency} onValueChange={setSelectedFrequency}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="regular">Regular</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedPriority} onValueChange={setSelectedPriority}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Patient List */}
      <Card>
        <CardHeader>
          <CardTitle>Patient Tracking List ({filteredPatients.length})</CardTitle>
          <CardDescription>Monitor patient engagement and behavior patterns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredPatients.map((patient) => (
              <div key={patient.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={patient.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {patient.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold">{patient.name}</h3>
                        <Badge variant="outline" className={getTagColor(patient.tag)}>
                          {patient.tag}
                        </Badge>
                        <Badge variant="secondary" className={getPriorityColor(patient.priority)}>
                          {patient.priority}
                        </Badge>
                      </div>

                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="flex items-center space-x-1">
                          {getFrequencyIcon(patient.visitFrequency)}
                          <span>{patient.visitFrequency}</span>
                        </span>
                        <span>{patient.totalVisits} visits</span>
                        <span>Last: {new Date(patient.lastVisit).toLocaleDateString()}</span>
                        <span>Score: {patient.behaviorScore}/100</span>
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 text-yellow-500 fill-current" />
                          <span>{patient.feedbackScore}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleViewPatient(patient)}>
                      <Eye className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                    <Button size="sm" onClick={() => handleSendMessage(patient)}>
                      <Send className="h-4 w-4 mr-1" />
                      Message
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Patient Retention Trends</CardTitle>
            <CardDescription>Monthly retention rate percentage</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                retention: {
                  label: "Retention Rate",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={retentionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="retention" stroke="var(--color-retention)" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Communication Effectiveness</CardTitle>
            <CardDescription>Message delivery and engagement rates</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                sent: {
                  label: "Sent",
                  color: "hsl(var(--chart-1))",
                },
                opened: {
                  label: "Opened/Delivered",
                  color: "hsl(var(--chart-2))",
                },
                clicked: {
                  label: "Clicked/Replied",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={engagementData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="type" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="sent" fill="var(--color-sent)" />
                  <Bar dataKey="opened" fill="var(--color-opened)" />
                  <Bar dataKey="clicked" fill="var(--color-clicked)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* View Patient Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Patient Details - {selectedPatient?.name}</DialogTitle>
            <DialogDescription>Complete patient engagement overview</DialogDescription>
          </DialogHeader>

          {selectedPatient && (
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="engagement">Engagement History</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold">Contact Information</h4>
                    <p className="text-sm">Email: {selectedPatient.email}</p>
                    <p className="text-sm">Phone: {selectedPatient.phone}</p>
                    <p className="text-sm">Patient ID: {selectedPatient.id}</p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold">Visit Information</h4>
                    <p className="text-sm">Total Visits: {selectedPatient.totalVisits}</p>
                    <p className="text-sm">Last Visit: {new Date(selectedPatient.lastVisit).toLocaleDateString()}</p>
                    <p className="text-sm">
                      Next Follow-up: {new Date(selectedPatient.nextFollowUp).toLocaleDateString()}
                    </p>
                    <p className="text-sm">Missed Appointments: {selectedPatient.missedAppointments}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold">Behavior Metrics</h4>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>Behavior Score</span>
                        <span>{selectedPatient.behaviorScore}/100</span>
                      </div>
                      <Progress value={selectedPatient.behaviorScore} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>Feedback Score</span>
                        <span>{selectedPatient.feedbackScore}/5.0</span>
                      </div>
                      <Progress value={(selectedPatient.feedbackScore / 5) * 100} className="h-2" />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="engagement" className="space-y-4">
                <h4 className="font-semibold">Communication History</h4>
                <div className="space-y-3">
                  {selectedPatient.engagementHistory.map((engagement, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        {engagement.type === "Email" && <Mail className="h-4 w-4 text-blue-500" />}
                        {engagement.type === "SMS" && <MessageSquare className="h-4 w-4 text-green-500" />}
                        {engagement.type === "Phone" && <Phone className="h-4 w-4 text-purple-500" />}
                        <div>
                          <p className="font-medium">{engagement.template}</p>
                          <p className="text-sm text-gray-600">{new Date(engagement.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <Badge
                        variant={
                          engagement.status === "Opened" || engagement.status === "Completed" ? "default" : "secondary"
                        }
                      >
                        {engagement.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-4">
                <h4 className="font-semibold">Patient Analytics</h4>
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Engagement Trend</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-32">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart
                            data={[
                              { month: "Oct", score: 70 },
                              { month: "Nov", score: 75 },
                              { month: "Dec", score: 80 },
                              { month: "Jan", score: selectedPatient.behaviorScore },
                            ]}
                          >
                            <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={2} />
                            <XAxis dataKey="month" />
                            <YAxis />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Communication Response</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Email Open Rate</span>
                          <span>85%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>SMS Response Rate</span>
                          <span>60%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Call Completion</span>
                          <span>90%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>

      {/* Message Dialog */}
      <Dialog open={isMessageDialogOpen} onOpenChange={setIsMessageDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Send Message to {selectedPatient?.name}</DialogTitle>
            <DialogDescription>Choose message type and template</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium">Message Type</Label>
              <Select value={messageType} onValueChange={setMessageType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="sms">SMS</SelectItem>
                  <SelectItem value="phone">Phone Script</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-medium">Template</Label>
              <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose template" />
                </SelectTrigger>
                <SelectContent>
                  {messageTemplates[messageType]?.map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedTemplate && (
              <div className="p-3 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-2">Preview:</h4>
                {messageType === "email" && (
                  <div>
                    <p className="text-sm font-medium">
                      Subject: {messageTemplates.email.find((t) => t.id === selectedTemplate)?.subject}
                    </p>
                    <p className="text-sm mt-1">
                      {messageTemplates.email.find((t) => t.id === selectedTemplate)?.content}
                    </p>
                  </div>
                )}
                {messageType === "sms" && (
                  <p className="text-sm">{messageTemplates.sms.find((t) => t.id === selectedTemplate)?.content}</p>
                )}
                {messageType === "phone" && (
                  <p className="text-sm">{messageTemplates.phone.find((t) => t.id === selectedTemplate)?.script}</p>
                )}
              </div>
            )}

            <div>
              <Label className="text-sm font-medium">Custom Message (Optional)</Label>
              <Textarea
                placeholder="Add custom message or modifications..."
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsMessageDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSendMessageSubmit} disabled={!selectedTemplate}>
                Send Message
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
