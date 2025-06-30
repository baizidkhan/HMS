"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, Stethoscope, Users, UserCheck, Eye, EyeOff, Phone } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const [userType, setUserType] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = () => {
    if (userType && email && password) {
      // Redirect based on user type
      window.location.href = `/${userType}`
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-600 p-3 rounded-full">
              <Heart className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Hospital Management System</h1>
          <p className="text-gray-600">Secure access to your healthcare portal</p>
        </div>

        {/* Login Card */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>Choose your role and enter your credentials</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="userType">I am a</Label>
              <Select value={userType} onValueChange={setUserType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">
                    <div className="flex items-center space-x-2">
                      <UserCheck className="h-4 w-4" />
                      <span>Administrator</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="doctor">
                    <div className="flex items-center space-x-2">
                      <Stethoscope className="h-4 w-4" />
                      <span>Doctor</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="receptionist">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4" />
                      <span>Receptionist</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="patient">
                    <div className="flex items-center space-x-2">
                      <Heart className="h-4 w-4" />
                      <span>Patient</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <Button className="w-full" onClick={handleLogin} disabled={!userType || !email || !password}>
              Sign In
            </Button>

            <div className="text-center text-sm text-gray-600">
              <p>Demo Credentials:</p>
              <p>Email: demo@hospital.com | Password: demo123</p>
            </div>
          </CardContent>
        </Card>

        {/* Quick Access */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <Link href="/patient">
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4 text-center">
                <Heart className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                <p className="text-sm font-medium">Patient Portal</p>
              </CardContent>
            </Card>
          </Link>
          <Card
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => {
              // Show emergency contact dialog or make call
              if (window.confirm("Call Emergency Services (911)?")) {
                window.location.href = "tel:911"
              }
            }}
          >
            <CardContent className="p-4 text-center">
              <Phone className="h-6 w-6 mx-auto mb-2 text-green-600" />
              <p className="text-sm font-medium">Emergency: 911</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
