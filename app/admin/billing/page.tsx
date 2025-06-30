"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, Download, DollarSign, AlertCircle, CheckCircle, Clock } from "lucide-react"

// Mock billing data
const invoices = [
  {
    id: "INV-001",
    patientName: "John Smith",
    patientId: "P001",
    date: "2024-01-20",
    amount: 1250.0,
    status: "Paid",
    dueDate: "2024-02-20",
    services: [
      { name: "Consultation", amount: 150.0 },
      { name: "Blood Test", amount: 100.0 },
      { name: "Medication", amount: 1000.0 },
    ],
    insurance: "Blue Cross",
    paymentMethod: "Credit Card",
  },
  {
    id: "INV-002",
    patientName: "Sarah Johnson",
    patientId: "P002",
    date: "2024-01-19",
    amount: 850.0,
    status: "Pending",
    dueDate: "2024-02-19",
    services: [
      { name: "Consultation", amount: 150.0 },
      { name: "X-Ray", amount: 200.0 },
      { name: "Physical Therapy", amount: 500.0 },
    ],
    insurance: "Aetna",
    paymentMethod: "Pending",
  },
  {
    id: "INV-003",
    patientName: "Michael Brown",
    patientId: "P003",
    date: "2024-01-18",
    amount: 2100.0,
    status: "Overdue",
    dueDate: "2024-01-18",
    services: [
      { name: "Surgery", amount: 1500.0 },
      { name: "Anesthesia", amount: 300.0 },
      { name: "Hospital Stay", amount: 300.0 },
    ],
    insurance: "Medicare",
    paymentMethod: "Insurance Claim",
  },
]

const transactions = [
  {
    id: "TXN-001",
    date: "2024-01-20",
    patient: "John Smith",
    amount: 1250.0,
    type: "Payment Received",
    method: "Credit Card",
    status: "Completed",
  },
  {
    id: "TXN-002",
    date: "2024-01-19",
    patient: "Emily Wilson",
    amount: 75.0,
    type: "Copay",
    method: "Cash",
    status: "Completed",
  },
  {
    id: "TXN-003",
    date: "2024-01-18",
    patient: "Robert Davis",
    amount: 500.0,
    type: "Insurance Payment",
    method: "Electronic Transfer",
    status: "Pending",
  },
]

export default function BillingPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [isNewInvoiceOpen, setIsNewInvoiceOpen] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState(null)

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || invoice.status.toLowerCase() === selectedStatus
    return matchesSearch && matchesStatus
  })

  const totalRevenue = invoices.reduce((sum, inv) => sum + inv.amount, 0)
  const paidAmount = invoices.filter((inv) => inv.status === "Paid").reduce((sum, inv) => sum + inv.amount, 0)
  const pendingAmount = invoices.filter((inv) => inv.status === "Pending").reduce((sum, inv) => sum + inv.amount, 0)
  const overdueAmount = invoices.filter((inv) => inv.status === "Overdue").reduce((sum, inv) => sum + inv.amount, 0)

  const exportInvoices = () => {
    const csvContent = [
      ["Invoice ID", "Patient", "Date", "Amount", "Status", "Due Date"].join(","),
      ...filteredInvoices.map((invoice) =>
        [invoice.id, invoice.patientName, invoice.date, invoice.amount, invoice.status, invoice.dueDate].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "invoices.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Billing & Finance</h1>
          <p className="text-gray-600">Manage invoices, payments, and financial records</p>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={exportInvoices}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Dialog open={isNewInvoiceOpen} onOpenChange={setIsNewInvoiceOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Invoice
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Invoice</DialogTitle>
                <DialogDescription>Generate a new invoice for patient services.</DialogDescription>
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
                    <Label htmlFor="date">Invoice Date</Label>
                    <Input id="date" type="date" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label>Services</Label>
                  <div className="space-y-2">
                    <div className="grid grid-cols-3 gap-2">
                      <Input placeholder="Service name" />
                      <Input placeholder="Quantity" type="number" />
                      <Input placeholder="Amount" type="number" />
                    </div>
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Service
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="insurance">Insurance</Label>
                    <Input id="insurance" placeholder="Insurance provider" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="dueDate">Due Date</Label>
                    <Input id="dueDate" type="date" />
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsNewInvoiceOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsNewInvoiceOpen(false)}>Create Invoice</Button>
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
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Paid</p>
                <p className="text-2xl font-bold text-gray-900">${paidAmount.toLocaleString()}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">${pendingAmount.toLocaleString()}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Overdue</p>
                <p className="text-2xl font-bold text-gray-900">${overdueAmount.toLocaleString()}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="invoices" className="space-y-6">
        <TabsList>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="invoices" className="space-y-4">
          {/* Filters */}
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search invoices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Invoices Table */}
          <Card>
            <CardHeader>
              <CardTitle>Invoices</CardTitle>
              <CardDescription>Manage patient invoices and billing</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice ID</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInvoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">{invoice.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{invoice.patientName}</p>
                          <p className="text-sm text-gray-600">{invoice.patientId}</p>
                        </div>
                      </TableCell>
                      <TableCell>{invoice.date}</TableCell>
                      <TableCell className="font-medium">${invoice.amount.toLocaleString()}</TableCell>
                      <TableCell>{invoice.dueDate}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            invoice.status === "Paid"
                              ? "default"
                              : invoice.status === "Pending"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {invoice.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm" onClick={() => setSelectedInvoice(invoice)}>
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Payment history and transaction records</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">{transaction.id}</TableCell>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>{transaction.patient}</TableCell>
                      <TableCell>{transaction.type}</TableCell>
                      <TableCell>{transaction.method}</TableCell>
                      <TableCell className="font-medium">${transaction.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={transaction.status === "Completed" ? "default" : "secondary"}>
                          {transaction.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Summary</CardTitle>
                <CardDescription>Monthly revenue breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>January 2024</span>
                    <span className="font-bold">$45,230</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>December 2023</span>
                    <span className="font-bold">$38,920</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>November 2023</span>
                    <span className="font-bold">$42,150</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Distribution of payment methods</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Credit Card</span>
                    <span className="font-bold">45%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Insurance</span>
                    <span className="font-bold">35%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Cash</span>
                    <span className="font-bold">15%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Other</span>
                    <span className="font-bold">5%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Invoice Details Dialog */}
      {selectedInvoice && (
        <Dialog open={!!selectedInvoice} onOpenChange={() => setSelectedInvoice(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Invoice Details - {selectedInvoice.id}</DialogTitle>
              <DialogDescription>Complete invoice information</DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Patient</Label>
                  <p className="font-medium">{selectedInvoice.patientName}</p>
                </div>
                <div>
                  <Label>Invoice Date</Label>
                  <p className="font-medium">{selectedInvoice.date}</p>
                </div>
                <div>
                  <Label>Due Date</Label>
                  <p className="font-medium">{selectedInvoice.dueDate}</p>
                </div>
                <div>
                  <Label>Insurance</Label>
                  <p className="font-medium">{selectedInvoice.insurance}</p>
                </div>
              </div>
              <div>
                <Label>Services</Label>
                <div className="mt-2 space-y-2">
                  {selectedInvoice.services.map((service, index) => (
                    <div key={index} className="flex justify-between p-2 bg-gray-50 rounded">
                      <span>{service.name}</span>
                      <span className="font-medium">${service.amount.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between pt-2 border-t font-bold">
                  <span>Total</span>
                  <span>${selectedInvoice.amount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
