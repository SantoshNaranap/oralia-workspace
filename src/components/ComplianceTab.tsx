
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, XCircle, Download, FileText, Shield } from "lucide-react"

export function ComplianceTab() {
  const complianceStandards = [
    { name: "GDPR", status: "compliant", progress: 100, description: "General Data Protection Regulation" },
    { name: "SOC 2", status: "compliant", progress: 95, description: "Service Organization Control 2" },
    { name: "HIPAA", status: "partial", progress: 75, description: "Health Insurance Portability and Accountability Act" },
    { name: "PCI DSS", status: "non-compliant", progress: 45, description: "Payment Card Industry Data Security Standard" },
    { name: "ISO 27001", status: "compliant", progress: 90, description: "Information Security Management" }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "compliant":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "partial":
        return <XCircle className="w-4 h-4 text-yellow-500" />
      case "non-compliant":
        return <XCircle className="w-4 h-4 text-red-500" />
      default:
        return <XCircle className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      compliant: "default",
      partial: "secondary",
      "non-compliant": "destructive"
    }
    return <Badge variant={variants[status] as any}>{status}</Badge>
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Compliance Standards
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {complianceStandards.map((standard) => (
              <div key={standard.name} className="space-y-2 p-3 border rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(standard.status)}
                    <span className="font-medium">{standard.name}</span>
                  </div>
                  {getStatusBadge(standard.status)}
                </div>
                <div className="text-sm text-muted-foreground">{standard.description}</div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Compliance Score</span>
                    <span>{standard.progress}%</span>
                  </div>
                  <Progress value={standard.progress} className="h-2" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Privacy Controls</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="data-encryption">Data Encryption at Rest</Label>
              <Switch id="data-encryption" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="data-transit">Data Encryption in Transit</Label>
              <Switch id="data-transit" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="data-retention">Automated Data Retention</Label>
              <Switch id="data-retention" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="consent-management">Consent Management</Label>
              <Switch id="consent-management" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="right-erasure">Right to Erasure</Label>
              <Switch id="right-erasure" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="data-portability">Data Portability</Label>
              <Switch id="data-portability" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Audit Reports</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <div>
                  <div className="font-medium">GDPR Compliance Report</div>
                  <div className="text-sm text-muted-foreground">Generated: Dec 1, 2024</div>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-1" />
                Download
              </Button>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <div>
                  <div className="font-medium">SOC 2 Type II Report</div>
                  <div className="text-sm text-muted-foreground">Generated: Nov 15, 2024</div>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-1" />
                Download
              </Button>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <div>
                  <div className="font-medium">Security Assessment</div>
                  <div className="text-sm text-muted-foreground">Generated: Oct 30, 2024</div>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-1" />
                Download
              </Button>
            </div>
            <Button className="w-full" variant="outline">Generate New Report</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Data Processing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-3 border rounded-lg">
                <div className="text-2xl font-bold">1.2M</div>
                <div className="text-sm text-muted-foreground">Records Processed</div>
              </div>
              <div className="p-3 border rounded-lg">
                <div className="text-2xl font-bold">45</div>
                <div className="text-sm text-muted-foreground">Data Requests</div>
              </div>
              <div className="p-3 border rounded-lg">
                <div className="text-2xl font-bold">12</div>
                <div className="text-sm text-muted-foreground">Erasure Requests</div>
              </div>
              <div className="p-3 border rounded-lg">
                <div className="text-2xl font-bold">8</div>
                <div className="text-sm text-muted-foreground">Export Requests</div>
              </div>
            </div>
            <Button className="w-full" variant="outline">View Data Processing Log</Button>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end gap-3">
        <Button variant="outline">Export Compliance Report</Button>
        <Button>Save Compliance Settings</Button>
      </div>
    </div>
  )
}
