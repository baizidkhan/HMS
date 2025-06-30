"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import {
  UserPlus,
  Upload,
  Camera,
  CreditCard,
  FileText,
  CheckCircle,
  AlertCircle,
  User,
  Phone,
  Mail,
  Calendar,
} from "lucide-react"
import Link from "next/link"

export default function PatientRegistration() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    ssn: "",
    // Contact Information
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    // Emergency Contact
    emergencyName: "",
    emergencyRelation: "",
    emergencyPhone: "",
    // Insurance Information
    insuranceProvider: "",
    policyNumber: "",
    groupNumber: "",
    // Medical Information
    bloodType: "",
    allergies: "",
    medications: "",
    medicalHistory: "",
    // Consent and Agreements
    hipaaConsent: false,
    treatmentConsent: false,
    financialResponsibility: false,
  })

  const totalSteps = 5
  const progress = (currentStep / totalSteps) * 100

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/receptionist" className="flex items-center space-x-2">
                <UserPlus className="h-8 w-8 text-blue-600" />
                <div>
                  <span className="text-xl font-bold text-gray-900">Patient Registration</span>
                  <p className="text-sm text-gray-600">Register new patients in the system</p>
                </div>
              </Link>
            </div>
            <Link href="/receptionist">
              <Button variant="outline">Back to Dashboard</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Progress Bar */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Registration Progress</h2>
              <span className="text-sm text-gray-600">
                Step {currentStep} of {totalSteps}
              </span>
            </div>
            <Progress value={progress} className="h-2 mb-4" />
            <div className="flex justify-between text-sm">
              <span className={currentStep >= 1 ? "text-blue-600 font-medium" : "text-gray-400"}>Personal Info</span>
              <span className={currentStep >= 2 ? "text-blue-600 font-medium" : "text-gray-400"}>Contact Details</span>
              <span className={currentStep >= 3 ? "text-blue-600 font-medium" : "text-gray-400"}>Insurance</span>
              <span className={currentStep >= 4 ? "text-blue-600 font-medium" : "text-gray-400"}>Medical Info</span>
              <span className={currentStep >= 5 ? "text-blue-600 font-medium" : "text-gray-400"}>Verification</span>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>
                  {currentStep === 1 && "Personal Information"}
                  {currentStep === 2 && "Contact Information"}
                  {currentStep === 3 && "Insurance Information"}
                  {currentStep === 4 && "Medical Information"}
                  {currentStep === 5 && "Verification & Consent"}
                </CardTitle>
                <CardDescription>
                  {currentStep === 1 && "Enter the patient's basic personal details"}
                  {currentStep === 2 && "Provide contact and emergency contact information"}
                  {currentStep === 3 && "Insurance and billing information"}
                  {currentStep === 4 && "Medical history and current medications"}
                  {currentStep === 5 && "Review information and obtain consent"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Step 1: Personal Information */}
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          placeholder="John"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          placeholder="Smith"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                        <Input
                          id="dateOfBirth"
                          type="date"
                          value={formData.dateOfBirth}
                          onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="gender">Gender *</Label>
                        <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                            <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="ssn">Social Security Number</Label>
                      <Input
                        id="ssn"
                        value={formData.ssn}
                        onChange={(e) => handleInputChange("ssn", e.target.value)}
                        placeholder="XXX-XX-XXXX"
                      />
                    </div>
                  </div>
                )}

                {/* Step 2: Contact Information */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-4">Contact Information</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="phone">Phone Number *</Label>
                          <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            placeholder="(555) 123-4567"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            placeholder="john.smith@email.com"
                          />
                        </div>
                      </div>
                      <div className="mt-4">
                        <Label htmlFor="address">Address *</Label>
                        <Input
                          id="address"
                          value={formData.address}
                          onChange={(e) => handleInputChange("address", e.target.value)}
                          placeholder="123 Main Street"
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-4 mt-4">
                        <div>
                          <Label htmlFor="city">City *</Label>
                          <Input
                            id="city"
                            value={formData.city}
                            onChange={(e) => handleInputChange("city", e.target.value)}
                            placeholder="City"
                          />
                        </div>
                        <div>
                          <Label htmlFor="state">State *</Label>
                          <Input
                            id="state"
                            value={formData.state}
                            onChange={(e) => handleInputChange("state", e.target.value)}
                            placeholder="State"
                          />
                        </div>
                        <div>
                          <Label htmlFor="zipCode">ZIP Code *</Label>
                          <Input
                            id="zipCode"
                            value={formData.zipCode}
                            onChange={(e) => handleInputChange("zipCode", e.target.value)}
                            placeholder="12345"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-4">Emergency Contact</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="emergencyName">Contact Name *</Label>
                          <Input
                            id="emergencyName"
                            value={formData.emergencyName}
                            onChange={(e) => handleInputChange("emergencyName", e.target.value)}
                            placeholder="Jane Smith"
                          />
                        </div>
                        <div>
                          <Label htmlFor="emergencyRelation">Relationship *</Label>
                          <Input
                            id="emergencyRelation"
                            value={formData.emergencyRelation}
                            onChange={(e) => handleInputChange("emergencyRelation", e.target.value)}
                            placeholder="Spouse"
                          />
                        </div>
                      </div>
                      <div className="mt-4">
                        <Label htmlFor="emergencyPhone">Emergency Phone *</Label>
                        <Input
                          id="emergencyPhone"
                          value={formData.emergencyPhone}
                          onChange={(e) => handleInputChange("emergencyPhone", e.target.value)}
                          placeholder="(555) 987-6543"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Insurance Information */}
                {currentStep === 3 && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="insuranceProvider">Insurance Provider</Label>
                      <Select
                        value={formData.insuranceProvider}
                        onValueChange={(value) => handleInputChange("insuranceProvider", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select insurance provider" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="blue-cross">Blue Cross Blue Shield</SelectItem>
                          <SelectItem value="aetna">Aetna</SelectItem>
                          <SelectItem value="cigna">Cigna</SelectItem>
                          <SelectItem value="united">United Healthcare</SelectItem>
                          <SelectItem value="medicare">Medicare</SelectItem>
                          <SelectItem value="medicaid">Medicaid</SelectItem>
                          <SelectItem value="self-pay">Self Pay</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="policyNumber">Policy Number</Label>
                        <Input
                          id="policyNumber"
                          value={formData.policyNumber}
                          onChange={(e) => handleInputChange("policyNumber", e.target.value)}
                          placeholder="Policy number"
                        />
                      </div>
                      <div>
                        <Label htmlFor="groupNumber">Group Number</Label>
                        <Input
                          id="groupNumber"
                          value={formData.groupNumber}
                          onChange={(e) => handleInputChange("groupNumber", e.target.value)}
                          placeholder="Group number"
                        />
                      </div>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Camera className="h-5 w-5 text-blue-600" />
                        <span className="font-medium text-blue-900">Insurance Card Upload</span>
                      </div>
                      <p className="text-sm text-blue-700 mb-3">Please upload front and back of insurance card</p>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Front
                        </Button>
                        <Button variant="outline" size="sm">
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Back
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Medical Information */}
                {currentStep === 4 && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="bloodType">Blood Type</Label>
                      <Select
                        value={formData.bloodType}
                        onValueChange={(value) => handleInputChange("bloodType", value)}
                      >
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
                          <SelectItem value="unknown">Unknown</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="allergies">Allergies</Label>
                      <Textarea
                        id="allergies"
                        value={formData.allergies}
                        onChange={(e) => handleInputChange("allergies", e.target.value)}
                        placeholder="List any known allergies (medications, food, environmental, etc.)"
                      />
                    </div>
                    <div>
                      <Label htmlFor="medications">Current Medications</Label>
                      <Textarea
                        id="medications"
                        value={formData.medications}
                        onChange={(e) => handleInputChange("medications", e.target.value)}
                        placeholder="List all current medications, dosages, and frequency"
                      />
                    </div>
                    <div>
                      <Label htmlFor="medicalHistory">Medical History</Label>
                      <Textarea
                        id="medicalHistory"
                        value={formData.medicalHistory}
                        onChange={(e) => handleInputChange("medicalHistory", e.target.value)}
                        placeholder="Previous surgeries, chronic conditions, family history, etc."
                      />
                    </div>
                  </div>
                )}

                {/* Step 5: Verification & Consent */}
                {currentStep === 5 && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-4">Patient Information Review</h4>
                      <div className="p-4 bg-gray-50 rounded-lg space-y-2">
                        <p>
                          <strong>Name:</strong> {formData.firstName} {formData.lastName}
                        </p>
                        <p>
                          <strong>Date of Birth:</strong> {formData.dateOfBirth}
                        </p>
                        <p>
                          <strong>Phone:</strong> {formData.phone}
                        </p>
                        <p>
                          <strong>Email:</strong> {formData.email}
                        </p>
                        <p>
                          <strong>Address:</strong> {formData.address}, {formData.city}, {formData.state}{" "}
                          {formData.zipCode}
                        </p>
                        <p>
                          <strong>Insurance:</strong> {formData.insuranceProvider}
                        </p>
                        <p>
                          <strong>Emergency Contact:</strong> {formData.emergencyName} ({formData.emergencyRelation}) -{" "}
                          {formData.emergencyPhone}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-4">Required Consents</h4>
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <Checkbox
                            id="hipaaConsent"
                            checked={formData.hipaaConsent}
                            onCheckedChange={(checked) => handleInputChange("hipaaConsent", checked)}
                          />
                          <div>
                            <Label htmlFor="hipaaConsent" className="font-medium">
                              HIPAA Privacy Notice
                            </Label>
                            <p className="text-sm text-gray-600">
                              I acknowledge that I have received and understand the HIPAA Privacy Notice.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <Checkbox
                            id="treatmentConsent"
                            checked={formData.treatmentConsent}
                            onCheckedChange={(checked) => handleInputChange("treatmentConsent", checked)}
                          />
                          <div>
                            <Label htmlFor="treatmentConsent" className="font-medium">
                              Consent for Treatment
                            </Label>
                            <p className="text-sm text-gray-600">
                              I consent to medical treatment and procedures as deemed necessary by my healthcare
                              provider.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <Checkbox
                            id="financialResponsibility"
                            checked={formData.financialResponsibility}
                            onCheckedChange={(checked) => handleInputChange("financialResponsibility", checked)}
                          />
                          <div>
                            <Label htmlFor="financialResponsibility" className="font-medium">
                              Financial Responsibility
                            </Label>
                            <p className="text-sm text-gray-600">
                              I understand and accept financial responsibility for services provided.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6 border-t">
                  <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
                    Previous
                  </Button>
                  {currentStep < totalSteps ? (
                    <Button onClick={nextStep}>Next Step</Button>
                  ) : (
                    <Button className="bg-green-600 hover:bg-green-700">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Complete Registration
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Registration Checklist */}
            <Card>
              <CardHeader>
                <CardTitle>Registration Checklist</CardTitle>
                <CardDescription>Required items for registration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Photo ID</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Insurance Card</span>
                </div>
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm">Emergency Contact Info</span>
                </div>
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm">Medical History</span>
                </div>
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm">Current Medications</span>
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
                  <User className="h-4 w-4 mr-2" />
                  Search Existing Patient
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Appointment
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Verify Insurance
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <FileText className="h-4 w-4 mr-2" />
                  Print Forms
                </Button>
              </CardContent>
            </Card>

            {/* Help & Support */}
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-gray-600">For assistance with registration:</p>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="text-sm">Call IT Support: ext. 1234</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span className="text-sm">Email: support@hospital.com</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
