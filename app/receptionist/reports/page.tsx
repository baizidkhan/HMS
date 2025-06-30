"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Download,
  Calendar,
  Users,
  Clock,
  TrendingUp,
  TrendingDown,
  FileText,
  BarChart3,
  PieChart,
  Activity,
} from "lucide-react"

// Mock data
const dailyStats = {
  date: "2024-01-15",
  appointments: {
    total: 45,
    completed: 38,
    cancelled: 4,
    noShow: 3,
  },
  registrations: 12,
  walkIns: 8,
  emergencies: 3,
}

const weeklyData = [
  { day: "Monday", appointments: 42, registrations: 8, walkIns: 5 },
  { day: "Tuesday", appointments: 38, registrations: 12, walkIns: 7 },
  { day: "Wednesday", appointments: 45, registrations: 6, walkIns: 9 },
  { day: "Thursday", appointments: 41, registrations: 10, walkIns: 4 },
  { day: "Friday", appointments: 48, registrations: 15, walkIns: 8 },
  { day: "Saturday", appointments: 35, registrations: 5, walkIns: 12 },
  { day: "Sunday", appointments: 28, registrations: 3, walkIns: 6 },
]

const monthlyTrends = {
  appointments: { current: 1250, previous: 1180, change: 5.9 },
  registrations: { current: 280, previous: 245, change: 14.3 },
  revenue: { current: 125000, previous: 118000, change: 5.9 },
  satisfaction: { current: 4.6, previous: 4.4, change: 4.5 },
}

const topServices = [
  { service: "General Consultation", count: 245, percentage: 35.2 },
  { service: "Blood Test", count: 180, percentage: 25.9 },
  { service: "X-Ray", count: 120, percentage: 17.3 },
  { service: "Vaccination", count: 85, percentage: 12.2 },
  { service: "Physical Exam", count: 65, percentage: 9.4 },
]

const recentActivities = [
  {
    time: "09:30 AM",
    activity: "New patient registration",
    patient: "John Smith",
    status: "completed",
  },
  {
    time: "10:15 AM",
    activity: "Appointment scheduled",
    patient: "Sarah Johnson",
    status: "scheduled",
  },
  {
    time: "11:00 AM",
    activity: "Walk-in patient",
    patient: "Mike Davis",
    status: "waiting",
  },
  {
    time: "11:30 AM",
    activity: "Appointment cancelled",
    patient: "Lisa Wilson",
    status: "cancelled",
  },
]

export default function ReceptionistReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("today")
  const [selectedReport, setSelectedReport] = useState("overview")

  const getTrendIcon = (change: number) => {
    return change > 0 ? (
      <TrendingUp className="h-4 w-4 text-green-600" />
    ) : (
      <TrendingDown className="h-4 w-4 text-red-600" />
    )
  }

  const getTrendColor = (change: number) => {
    return change > 0 ? "text-green-600" : "text-red-600"
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "scheduled":
        return "bg-blue-100 text-blue-800"
      case "waiting":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Reception Reports</h1>
          <p className="text-gray-600">Track daily operations and performance metrics</p>
        </div>
        <div className="flex space-x-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[180px]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Daily Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Appointments</p>
                <p className="text-2xl font-bold">{dailyStats.appointments.total}</p>
                <p className="text-xs text-gray-500">{dailyStats.appointments.completed} completed</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">New Registrations</p>
                <p className="text-2xl font-bold">{dailyStats.registrations}</p>
                <p className="text-xs text-gray-500">Today</p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Walk-ins</p>
                <p className="text-2xl font-bold">{dailyStats.walkIns}</p>
                <p className="text-xs text-gray-500">No appointment</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Emergencies</p>
                <p className="text-2xl font-bold">{dailyStats.emergencies}</p>
                <p className="text-xs text-gray-500">Urgent cases</p>
              </div>
              <Activity className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reports Tabs */}
      <Tabs value={selectedReport} onValueChange={setSelectedReport}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="activity">Activity Log</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Monthly Trends */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Monthly Trends
                </CardTitle>
                <CardDescription>Comparison with previous month</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Appointments</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold">{monthlyTrends.appointments.current}</span>
                    <div className="flex items-center space-x-1">
                      {getTrendIcon(monthlyTrends.appointments.change)}
                      <span className={`text-sm ${getTrendColor(monthlyTrends.appointments.change)}`}>
                        {monthlyTrends.appointments.change}%
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Registrations</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold">{monthlyTrends.registrations.current}</span>
                    <div className="flex items-center space-x-1">
                      {getTrendIcon(monthlyTrends.registrations.change)}
                      <span className={`text-sm ${getTrendColor(monthlyTrends.registrations.change)}`}>
                        {monthlyTrends.registrations.change}%
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Revenue</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold">${monthlyTrends.revenue.current.toLocaleString()}</span>
                    <div className="flex items-center space-x-1">
                      {getTrendIcon(monthlyTrends.revenue.change)}
                      <span className={`text-sm ${getTrendColor(monthlyTrends.revenue.change)}`}>
                        {monthlyTrends.revenue.change}%
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Satisfaction</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold">{monthlyTrends.satisfaction.current}/5</span>
                    <div className="flex items-center space-x-1">
                      {getTrendIcon(monthlyTrends.satisfaction.change)}
                      <span className={`text-sm ${getTrendColor(monthlyTrends.satisfaction.change)}`}>
                        {monthlyTrends.satisfaction.change}%
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Weekly Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Weekly Performance
                </CardTitle>
                <CardDescription>Daily breakdown for this week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {weeklyData.map((day) => (
                    <div key={day.day} className="flex items-center justify-between">
                      <span className="text-sm font-medium w-20">{day.day}</span>
                      <div className="flex items-center space-x-4 flex-1">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-sm">{day.appointments} apt</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm">{day.registrations} reg</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                          <span className="text-sm">{day.walkIns} walk</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Appointments Tab */}
        <TabsContent value="appointments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Appointment Statistics</CardTitle>
              <CardDescription>Detailed breakdown of appointment data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">{dailyStats.appointments.completed}</p>
                  <p className="text-sm text-gray-600">Completed</p>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <p className="text-2xl font-bold text-yellow-600">{dailyStats.appointments.cancelled}</p>
                  <p className="text-sm text-gray-600">Cancelled</p>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <p className="text-2xl font-bold text-red-600">{dailyStats.appointments.noShow}</p>
                  <p className="text-sm text-gray-600">No Show</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">
                    {Math.round((dailyStats.appointments.completed / dailyStats.appointments.total) * 100)}%
                  </p>
                  <p className="text-sm text-gray-600">Success Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Services Tab */}
        <TabsContent value="services" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                Top Services
              </CardTitle>
              <CardDescription>Most requested services this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topServices.map((service, index) => (
                  <div key={service.service} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-medium text-gray-500">#{index + 1}</span>
                      <span className="font-medium">{service.service}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-gray-600">{service.count} requests</span>
                      <Badge variant="secondary">{service.percentage}%</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Activity Log Tab */}
        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Recent Activity
              </CardTitle>
              <CardDescription>Latest reception desk activities</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Time</TableHead>
                    <TableHead>Activity</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentActivities.map((activity, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{activity.time}</TableCell>
                      <TableCell>{activity.activity}</TableCell>
                      <TableCell>{activity.patient}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(activity.status)}>{activity.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
