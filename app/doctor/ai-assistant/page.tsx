"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import {
  Brain,
  AlertTriangle,
  CheckCircle,
  Send,
  Lightbulb,
  FileText,
  Pill,
  TrendingUp,
  Search,
  Zap,
} from "lucide-react"
import Link from "next/link"

// Mock AI suggestions and alerts
const aiAlerts = [
  {
    id: "AI001",
    type: "drug-interaction",
    priority: "high",
    patient: "John Smith",
    title: "Potential Drug Interaction",
    message: "Lisinopril + Ibuprofen may increase risk of kidney problems",
    recommendation: "Consider alternative pain management or monitor kidney function",
    confidence: 95,
    timestamp: "2 minutes ago",
  },
  {
    id: "AI002",
    type: "diagnosis-support",
    priority: "medium",
    patient: "Sarah Johnson",
    title: "Diagnostic Suggestion",
    message: "Symptoms pattern suggests possible thyroid dysfunction",
    recommendation: "Consider ordering TSH, T3, T4 tests",
    confidence: 78,
    timestamp: "15 minutes ago",
  },
  {
    id: "AI003",
    type: "treatment-optimization",
    priority: "low",
    patient: "Mike Davis",
    title: "Treatment Optimization",
    message: "Patient may benefit from extended-release formulation",
    recommendation: "Consider switching to Metformin XR for better compliance",
    confidence: 82,
    timestamp: "1 hour ago",
  },
]

const chatHistory = [
  {
    id: 1,
    type: "user",
    message: "What are the latest treatment guidelines for Type 2 diabetes?",
    timestamp: "10:30 AM",
  },
  {
    id: 2,
    type: "ai",
    message:
      "Based on the latest ADA guidelines (2024), the recommended approach for Type 2 diabetes includes:\n\n1. **First-line therapy**: Metformin unless contraindicated\n2. **Lifestyle modifications**: Diet, exercise, weight management\n3. **Second-line options**: GLP-1 agonists, SGLT-2 inhibitors, or insulin based on patient factors\n4. **Target HbA1c**: <7% for most adults, individualized based on patient factors\n\nWould you like me to elaborate on any specific aspect?",
    timestamp: "10:31 AM",
  },
  {
    id: 3,
    type: "user",
    message: "Tell me about SGLT-2 inhibitors contraindications",
    timestamp: "10:35 AM",
  },
  {
    id: 4,
    type: "ai",
    message:
      "SGLT-2 inhibitors contraindications include:\n\n**Absolute contraindications:**\n- Type 1 diabetes\n- Severe renal impairment (eGFR <30 mL/min/1.73m²)\n- End-stage renal disease\n- Dialysis\n\n**Relative contraindications/cautions:**\n- History of diabetic ketoacidosis\n- Recurrent UTIs or genital infections\n- Volume depletion\n- Elderly patients (increased fall risk)\n- Pregnancy and breastfeeding\n\n**Monitor for:** Ketoacidosis, UTIs, hypotension, and renal function.",
    timestamp: "10:36 AM",
  },
]

const quickActions = [
  { icon: Pill, label: "Drug Interactions", description: "Check medication interactions" },
  { icon: FileText, label: "Diagnosis Support", description: "Get diagnostic suggestions" },
  { icon: TrendingUp, label: "Treatment Plans", description: "Optimize treatment protocols" },
  { icon: Search, label: "Medical Research", description: "Latest research and guidelines" },
]

export default function AIAssistantPage() {
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = () => {
    if (message.trim()) {
      setIsLoading(true)
      // Simulate AI response
      setTimeout(() => {
        setIsLoading(false)
        setMessage("")
      }, 2000)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">AI Medical Assistant</h1>
          <p className="text-gray-600">Get intelligent insights and recommendations for patient care</p>
        </div>
        <Link href="/doctor">
          <Button variant="outline">Back to Dashboard</Button>
        </Link>
      </div>

      {/* AI Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Alerts</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Suggestions Today</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
              <Lightbulb className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Accuracy Rate</p>
                <p className="text-2xl font-bold text-gray-900">94%</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Time Saved</p>
                <p className="text-2xl font-bold text-gray-900">2.5h</p>
              </div>
              <Zap className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* AI Chat Interface */}
        <div className="lg:col-span-2">
          <Card className="h-[600px] flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="h-5 w-5 text-purple-600" />
                <span>AI Medical Assistant</span>
              </CardTitle>
              <CardDescription>Ask questions about diagnoses, treatments, or medical guidelines</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                {chatHistory.map((chat) => (
                  <div key={chat.id} className={`flex ${chat.type === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`flex items-start space-x-2 max-w-[80%]`}>
                      {chat.type === "ai" && (
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-purple-100 text-purple-600">
                            <Brain className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={`p-3 rounded-lg ${
                          chat.type === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{chat.message}</p>
                        <p className={`text-xs mt-1 ${chat.type === "user" ? "text-blue-100" : "text-gray-500"}`}>
                          {chat.timestamp}
                        </p>
                      </div>
                      {chat.type === "user" && (
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-blue-100 text-blue-600">Dr</AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="flex items-start space-x-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-purple-100 text-purple-600">
                          <Brain className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="bg-gray-100 p-3 rounded-lg">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Message Input */}
              <div className="flex space-x-2">
                <Textarea
                  placeholder="Ask me anything about medical conditions, treatments, or guidelines..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1 min-h-[60px]"
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                />
                <Button onClick={handleSendMessage} disabled={!message.trim() || isLoading}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common AI assistance tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {quickActions.map((action, index) => (
                <Button key={index} variant="outline" className="w-full justify-start bg-transparent h-auto p-4">
                  <action.icon className="h-5 w-5 mr-3" />
                  <div className="text-left">
                    <p className="font-medium">{action.label}</p>
                    <p className="text-xs text-gray-600">{action.description}</p>
                  </div>
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* AI Alerts */}
          <Card>
            <CardHeader>
              <CardTitle>AI Alerts & Suggestions</CardTitle>
              <CardDescription>Real-time intelligent recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {aiAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-3 rounded-lg border-l-4 ${
                      alert.priority === "high"
                        ? "bg-red-50 border-red-500"
                        : alert.priority === "medium"
                          ? "bg-yellow-50 border-yellow-500"
                          : "bg-blue-50 border-blue-500"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <Badge
                            variant={
                              alert.priority === "high"
                                ? "destructive"
                                : alert.priority === "medium"
                                  ? "default"
                                  : "secondary"
                            }
                            className="text-xs"
                          >
                            {alert.priority.toUpperCase()}
                          </Badge>
                          <span className="text-xs text-gray-500">{alert.confidence}% confidence</span>
                        </div>
                        <h4 className="font-medium text-sm text-gray-900">{alert.title}</h4>
                        <p className="text-xs text-gray-600 mb-1">Patient: {alert.patient}</p>
                        <p className="text-xs text-gray-700">{alert.message}</p>
                        <p className="text-xs text-gray-600 mt-1">
                          <strong>Recommendation:</strong> {alert.recommendation}
                        </p>
                      </div>
                      {alert.priority === "high" && <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5" />}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">{alert.timestamp}</span>
                      <div className="flex space-x-1">
                        <Button variant="outline" size="sm" className="h-6 text-xs bg-transparent">
                          Accept
                        </Button>
                        <Button variant="outline" size="sm" className="h-6 text-xs bg-transparent">
                          Dismiss
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
