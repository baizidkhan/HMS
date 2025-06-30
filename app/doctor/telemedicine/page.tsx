"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  PhoneOff,
  MessageSquare,
  FileText,
  Clock,
  Users,
  Settings,
  CheckCircle,
  AlertTriangle,
} from "lucide-react"
import Link from "next/link"

// Mock data
const upcomingTeleconsults = [
  {
    id: "T001",
    patient: "John Smith",
    time: "10:00 AM",
    duration: "30 min",
    type: "Follow-up",
    status: "Scheduled",
    avatar: "JS",
    condition: "Hypertension",
    lastVisit: "2024-01-15",
  },
  {
    id: "T002",
    patient: "Sarah Johnson",
    time: "11:30 AM",
    duration: "45 min",
    type: "Consultation",
    status: "Waiting",
    avatar: "SJ",
    condition: "Diabetes",
    lastVisit: "2024-01-10",
  },
  {
    id: "T003",
    patient: "Robert Brown",
    time: "02:00 PM",
    duration: "30 min",
    type: "Prescription Review",
    status: "Scheduled",
    avatar: "RB",
    condition: "Medication Review",
    lastVisit: "2024-01-08",
  },
]

const recentTeleconsults = [
  {
    id: "T004",
    patient: "Emily Wilson",
    date: "2024-01-19",
    duration: "25 min",
    type: "Follow-up",
    status: "Completed",
    avatar: "EW",
    notes: "Patient doing well, continue current medication",
  },
  {
    id: "T005",
    patient: "Mike Davis",
    date: "2024-01-18",
    duration: "40 min",
    type: "Consultation",
    status: "Completed",
    avatar: "MD",
    notes: "Discussed treatment options, scheduled follow-up",
  },
]

export default function TelemedicinePage() {
  const [isInCall, setIsInCall] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [activePatient, setActivePatient] = useState(null)
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null)
  const [cameraError, setCameraError] = useState<string>("")
  const [isInitializing, setIsInitializing] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isCameraReady, setIsCameraReady] = useState(false)
  const [callDuration, setCallDuration] = useState(0)
  const [videoPlaying, setVideoPlaying] = useState(false)

  const startCamera = async () => {
    console.log("🎥 Starting camera initialization...")
    setIsInitializing(true)
    setCameraError("")
    setIsCameraReady(false)
    setVideoPlaying(false)

    try {
      // Check if getUserMedia is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Camera access is not supported in this browser")
      }

      console.log("📱 Requesting camera access...")

      // Request camera access with simple constraints
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: "user",
        },
        audio: true,
      })

      console.log("✅ Camera stream obtained:", stream)
      console.log(
        "📹 Video tracks:",
        stream.getVideoTracks().map((t) => ({
          label: t.label,
          enabled: t.enabled,
          readyState: t.readyState,
        })),
      )

      setCameraStream(stream)

      // Wait for video element to be ready
      if (videoRef.current) {
        console.log("🔗 Setting up video element...")

        // Clear any existing source
        videoRef.current.srcObject = null

        // Set the stream
        videoRef.current.srcObject = stream
        videoRef.current.muted = true
        videoRef.current.playsInline = true
        videoRef.current.autoplay = true

        // Add event listeners
        const handleLoadedMetadata = () => {
          console.log("📊 Video metadata loaded")
          console.log("Video dimensions:", videoRef.current?.videoWidth, "x", videoRef.current?.videoHeight)
          setIsCameraReady(true)
        }

        const handleCanPlay = () => {
          console.log("▶️ Video can play")
          if (videoRef.current) {
            videoRef.current
              .play()
              .then(() => {
                console.log("🎬 Video playing successfully!")
                setVideoPlaying(true)
              })
              .catch((error) => {
                console.error("❌ Video play error:", error)
                setCameraError("Failed to play video")
              })
          }
        }

        const handlePlaying = () => {
          console.log("🚀 Video is now playing!")
          setVideoPlaying(true)
        }

        const handleError = (error) => {
          console.error("❌ Video element error:", error)
          setCameraError("Video display error")
        }

        // Remove existing listeners
        videoRef.current.removeEventListener("loadedmetadata", handleLoadedMetadata)
        videoRef.current.removeEventListener("canplay", handleCanPlay)
        videoRef.current.removeEventListener("playing", handlePlaying)
        videoRef.current.removeEventListener("error", handleError)

        // Add new listeners
        videoRef.current.addEventListener("loadedmetadata", handleLoadedMetadata)
        videoRef.current.addEventListener("canplay", handleCanPlay)
        videoRef.current.addEventListener("playing", handlePlaying)
        videoRef.current.addEventListener("error", handleError)

        // Force load
        videoRef.current.load()

        // Try to play immediately
        setTimeout(() => {
          if (videoRef.current) {
            videoRef.current
              .play()
              .then(() => {
                console.log("🎯 Immediate play successful")
                setVideoPlaying(true)
              })
              .catch((error) => {
                console.log("⚠️ Immediate play failed, will retry:", error)
              })
          }
        }, 100)
      }
    } catch (error) {
      console.error("❌ Camera initialization failed:", error)

      let errorMessage = "Camera access failed: "
      if (error.name === "NotAllowedError") {
        errorMessage += "Permission denied. Please allow camera access and refresh the page."
      } else if (error.name === "NotFoundError") {
        errorMessage += "No camera found. Please connect a camera device."
      } else if (error.name === "NotReadableError") {
        errorMessage += "Camera is being used by another application."
      } else if (error.name === "OverconstrainedError") {
        errorMessage += "Camera doesn't meet the requirements."
      } else {
        errorMessage += error.message || "Unknown error occurred."
      }

      setCameraError(errorMessage)
    } finally {
      setIsInitializing(false)
    }
  }

  const stopCamera = () => {
    console.log("🛑 Stopping camera...")

    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => {
        console.log(`Stopping ${track.kind} track:`, track.label)
        track.stop()
      })
      setCameraStream(null)
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null
    }

    setIsCameraReady(false)
    setVideoPlaying(false)
  }

  // Call duration timer
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isInCall) {
      interval = setInterval(() => {
        setCallDuration((prev) => prev + 1)
      }, 1000)
    } else {
      setCallDuration(0)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isInCall])

  // Camera management
  useEffect(() => {
    if (isInCall && activePatient) {
      startCamera()
    } else {
      stopCamera()
    }

    return () => {
      stopCamera()
    }
  }, [isInCall, activePatient])

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const startCall = (patient) => {
    console.log("📞 Starting call with:", patient.patient)
    setActivePatient(patient)
    setIsInCall(true)
  }

  const endCall = () => {
    console.log("📞 Ending call...")
    stopCamera()
    setIsInCall(false)
    setActivePatient(null)
    setIsMuted(false)
    setIsVideoOn(true)
    setCameraError("")
    setCallDuration(0)
  }

  const toggleVideo = () => {
    if (cameraStream) {
      const videoTrack = cameraStream.getVideoTracks()[0]
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled
        setIsVideoOn(videoTrack.enabled)
        console.log("📹 Video track enabled:", videoTrack.enabled)
      }
    }
  }

  const toggleAudio = () => {
    if (cameraStream) {
      const audioTrack = cameraStream.getAudioTracks()[0]
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled
        setIsMuted(!audioTrack.enabled)
        console.log("🎤 Audio track enabled:", audioTrack.enabled)
      }
    }
  }

  const retryCamera = () => {
    console.log("🔄 Retrying camera...")
    stopCamera()
    setTimeout(() => {
      startCamera()
    }, 1000)
  }

  if (isInCall && activePatient) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col">
        <div className="flex-1 relative">
          {/* Main Patient Video Area */}
          <div className="h-full bg-gray-800 relative">
            {/* Patient Video Placeholder */}
            <div className="w-full h-full flex items-center justify-center">
              <div className="bg-gray-700 rounded-lg p-8 text-center">
                <Avatar className="h-32 w-32 mx-auto mb-4">
                  <AvatarImage src="/placeholder.svg?height=128&width=128" />
                  <AvatarFallback className="bg-blue-100 text-blue-600 text-4xl">{activePatient.avatar}</AvatarFallback>
                </Avatar>
                <h3 className="text-white text-xl font-semibold">{activePatient.patient}</h3>
                <p className="text-gray-300">{activePatient.condition}</p>
                <div className="mt-4 text-sm text-gray-400">
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span>Patient connected</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Doctor Video Window - VERY LARGE AND PROMINENT */}
            <div className="absolute top-4 right-4 w-[500px] h-[375px] bg-black rounded-2xl border-4 border-blue-500 shadow-2xl overflow-hidden">
              {videoPlaying && isVideoOn && cameraStream ? (
                <div className="relative w-full h-full">
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                    style={{
                      transform: "scaleX(-1)", // Mirror effect
                      backgroundColor: "#000000",
                      display: "block",
                    }}
                  />
                  <div className="absolute bottom-4 left-4 bg-black bg-opacity-80 rounded-lg px-4 py-2">
                    <span className="text-white text-lg font-bold">Dr. Wilson (You)</span>
                  </div>
                  <div className="absolute top-4 right-4 flex items-center space-x-2">
                    <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-white text-sm bg-red-600 px-3 py-1 rounded-full font-bold">LIVE</span>
                  </div>
                  <div className="absolute top-4 left-4 bg-green-600 bg-opacity-90 rounded-lg px-3 py-1">
                    <span className="text-white text-sm font-bold">CAMERA ACTIVE</span>
                  </div>
                </div>
              ) : isInitializing ? (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gray-900">
                  <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-blue-500 mb-6"></div>
                  <p className="text-white text-2xl mb-4 font-bold">Connecting Camera...</p>
                  <p className="text-gray-400 text-lg">Please allow camera access</p>
                </div>
              ) : cameraError ? (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gray-900 p-8">
                  <AlertTriangle className="h-20 w-20 text-red-400 mb-6" />
                  <p className="text-red-400 text-2xl mb-4 font-bold">Camera Error</p>
                  <p className="text-gray-400 text-lg text-center mb-6">{cameraError}</p>
                  <Button onClick={retryCamera} className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-6 py-3">
                    Retry Camera
                  </Button>
                </div>
              ) : !isVideoOn ? (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gray-900">
                  <VideoOff className="h-20 w-20 text-gray-400 mb-6" />
                  <p className="text-gray-400 text-2xl mb-4 font-bold">Video Off</p>
                  <p className="text-gray-500 text-lg">Dr. Wilson</p>
                </div>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gray-900">
                  <Video className="h-20 w-20 text-white mb-6" />
                  <p className="text-white text-2xl mb-4 font-bold">Camera Ready</p>
                  <p className="text-gray-300 text-lg">Starting video...</p>
                </div>
              )}
            </div>

            {/* Call Status */}
            <div className="absolute top-4 left-4 bg-black bg-opacity-90 rounded-xl p-4">
              <div className="flex items-center space-x-3 text-white">
                <div className="w-5 h-5 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-xl font-bold">Live Call • {formatDuration(callDuration)}</span>
              </div>
            </div>

            {/* Camera Status */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-90 rounded-xl p-4">
              <div className="flex items-center space-x-3 text-white">
                {videoPlaying && isCameraReady ? (
                  <>
                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                    <span className="text-lg font-bold">Camera Active & Recording</span>
                  </>
                ) : isInitializing ? (
                  <>
                    <div className="w-4 h-4 bg-yellow-500 rounded-full animate-pulse"></div>
                    <span className="text-lg font-bold">Connecting Camera...</span>
                  </>
                ) : cameraError ? (
                  <>
                    <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                    <span className="text-lg font-bold">Camera Error</span>
                  </>
                ) : (
                  <>
                    <div className="w-4 h-4 bg-gray-500 rounded-full"></div>
                    <span className="text-lg font-bold">Camera Inactive</span>
                  </>
                )}
              </div>
            </div>

            {/* Debug Info Panel */}
            <div className="absolute bottom-4 left-4 bg-black bg-opacity-90 rounded-xl p-4 text-white font-mono text-sm">
              <div className="space-y-2">
                <div className="text-lg font-bold mb-2">🔍 Camera Debug Info:</div>
                <div>Stream: {cameraStream ? "✅ Active" : "❌ None"}</div>
                <div>Video Ready: {isCameraReady ? "✅ Yes" : "❌ No"}</div>
                <div>Video Playing: {videoPlaying ? "✅ Yes" : "❌ No"}</div>
                <div>Video Enabled: {isVideoOn ? "✅ On" : "❌ Off"}</div>
                <div>Audio Enabled: {!isMuted ? "✅ On" : "❌ Muted"}</div>
                <div>Initializing: {isInitializing ? "⏳ Yes" : "✅ No"}</div>
                {cameraStream && (
                  <div>
                    <div>Video Tracks: {cameraStream.getVideoTracks().length}</div>
                    <div>Audio Tracks: {cameraStream.getAudioTracks().length}</div>
                  </div>
                )}
              </div>
            </div>

            {/* Error Alert */}
            {cameraError && (
              <div className="absolute bottom-40 left-4 right-4 max-w-2xl mx-auto">
                <Alert className="bg-red-900 border-red-700 border-2">
                  <AlertTriangle className="h-6 w-6" />
                  <AlertDescription className="text-white text-lg">
                    <strong className="text-xl">Camera Error:</strong> {cameraError}
                    <Button
                      size="lg"
                      variant="outline"
                      className="ml-4 text-white border-white hover:bg-white hover:text-red-900 bg-transparent"
                      onClick={retryCamera}
                    >
                      Try Again
                    </Button>
                  </AlertDescription>
                </Alert>
              </div>
            )}
          </div>

          {/* Call Controls */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="flex items-center space-x-6 bg-black bg-opacity-95 rounded-full px-10 py-6 shadow-2xl">
              <Button
                variant="ghost"
                size="icon"
                className={`rounded-full w-16 h-16 ${
                  isMuted ? "bg-red-600 hover:bg-red-700" : "bg-gray-700 hover:bg-gray-600"
                } text-white transition-all duration-200`}
                onClick={toggleAudio}
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <MicOff className="h-8 w-8" /> : <Mic className="h-8 w-8" />}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className={`rounded-full w-16 h-16 ${
                  !isVideoOn ? "bg-red-600 hover:bg-red-700" : "bg-gray-700 hover:bg-gray-600"
                } text-white transition-all duration-200`}
                onClick={toggleVideo}
                title={isVideoOn ? "Turn off video" : "Turn on video"}
              >
                {isVideoOn ? <Video className="h-8 w-8" /> : <VideoOff className="h-8 w-8" />}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="rounded-full w-16 h-16 bg-gray-700 hover:bg-gray-600 text-white transition-all duration-200"
                title="Chat"
              >
                <MessageSquare className="h-8 w-8" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="rounded-full w-16 h-16 bg-gray-700 hover:bg-gray-600 text-white transition-all duration-200"
                title="Notes"
              >
                <FileText className="h-8 w-8" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="rounded-full w-16 h-16 bg-red-600 hover:bg-red-700 text-white transition-all duration-200"
                onClick={endCall}
                title="End call"
              >
                <PhoneOff className="h-8 w-8" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Telemedicine</h1>
          <p className="text-gray-600">Conduct virtual consultations with your patients</p>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Video Settings
          </Button>
          <Link href="/doctor">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Today's Teleconsults</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
              <Video className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">2</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Time</p>
                <p className="text-2xl font-bold text-gray-900">1h 45m</p>
              </div>
              <Clock className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Waiting Patients</p>
                <p className="text-2xl font-bold text-gray-900">1</p>
              </div>
              <Users className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="upcoming" className="space-y-6">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming Teleconsults</TabsTrigger>
          <TabsTrigger value="recent">Recent Sessions</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Today's Virtual Appointments</CardTitle>
              <CardDescription>Scheduled teleconsultations for today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingTeleconsults.map((consult) => (
                  <div key={consult.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src="/placeholder.svg?height=48&width=48" />
                        <AvatarFallback className="bg-blue-100 text-blue-600">{consult.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-gray-900">{consult.patient}</p>
                        <p className="text-sm text-gray-600">
                          {consult.time} • {consult.duration} • {consult.type}
                        </p>
                        <p className="text-sm text-gray-600">{consult.condition}</p>
                        <p className="text-xs text-gray-500">Last visit: {consult.lastVisit}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge variant={consult.status === "Waiting" ? "default" : "secondary"}>{consult.status}</Badge>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => startCall(consult)}
                          disabled={consult.status !== "Waiting"}
                        >
                          <Video className="h-4 w-4 mr-2" />
                          {consult.status === "Waiting" ? "Join Call" : "Start Call"}
                        </Button>
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recent" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Teleconsultations</CardTitle>
              <CardDescription>Completed virtual appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTeleconsults.map((consult) => (
                  <div key={consult.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src="/placeholder.svg?height=48&width=48" />
                        <AvatarFallback className="bg-blue-100 text-blue-600">{consult.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-gray-900">{consult.patient}</p>
                        <p className="text-sm text-gray-600">
                          {consult.date} • {consult.duration} • {consult.type}
                        </p>
                        <p className="text-sm text-gray-700">{consult.notes}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge variant="default">{consult.status}</Badge>
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4 mr-2" />
                        View Notes
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Video Settings</CardTitle>
                <CardDescription>Configure your camera and video quality</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Camera</label>
                  <select className="w-full mt-1 p-2 border rounded-md">
                    <option>Built-in Camera</option>
                    <option>External USB Camera</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Video Quality</label>
                  <select className="w-full mt-1 p-2 border rounded-md">
                    <option>HD (720p)</option>
                    <option>Full HD (1080p)</option>
                    <option>4K (2160p)</option>
                  </select>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="autoStart" />
                  <label htmlFor="autoStart" className="text-sm">
                    Auto-start video in calls
                  </label>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Audio Settings</CardTitle>
                <CardDescription>Configure your microphone and audio</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Microphone</label>
                  <select className="w-full mt-1 p-2 border rounded-md">
                    <option>Built-in Microphone</option>
                    <option>External USB Microphone</option>
                    <option>Bluetooth Headset</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Speaker</label>
                  <select className="w-full mt-1 p-2 border rounded-md">
                    <option>Built-in Speakers</option>
                    <option>External Speakers</option>
                    <option>Bluetooth Headset</option>
                  </select>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="noiseCancellation" />
                  <label htmlFor="noiseCancellation" className="text-sm">
                    Enable noise cancellation
                  </label>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
