import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, XCircle, Clock, Settings } from "lucide-react"
import { useState } from "react"

export function IntegrationsTab() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [newIntegration, setNewIntegration] = useState({
    name: "",
    type: "",
    apiKey: "",
    webhookUrl: ""
  })

  const integrations = [
    { name: "Stripe", status: "connected", lastSync: "2 minutes ago", logo: "💳" },
    { name: "Slack", status: "connected", lastSync: "1 hour ago", logo: "💬" },
    { name: "Microsoft Teams", status: "disconnected", lastSync: "Never", logo: "👥" },
    { name: "Salesforce", status: "pending", lastSync: "Syncing...", logo: "☁️" },
    { name: "HubSpot", status: "connected", lastSync: "30 minutes ago", logo: "🎯" },
    { name: "Zendesk", status: "disconnected", lastSync: "Never", logo: "🎧" },
    { name: "Google Workspace", status: "connected", lastSync: "5 minutes ago", logo: "📧" },
    { name: "AWS", status: "connected", lastSync: "1 minute ago", logo: "☁️" }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "disconnected":
        return <XCircle className="w-4 h-4 text-red-500" />
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-500" />
      default:
        return <XCircle className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      connected: "default",
      disconnected: "destructive",
      pending: "secondary"
    }
    return <Badge variant={variants[status] as any}>{status}</Badge>
  }

  const handleAddIntegration = () => {
    console.log("Adding new integration:", newIntegration)
    setIsAddModalOpen(false)
    setNewIntegration({ name: "", type: "", apiKey: "", webhookUrl: "" })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Integration Management</h3>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button>Add Integration</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Integration</DialogTitle>
              <DialogDescription>
                Configure a new integration with your preferred service. All fields are required.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="integration-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="integration-name"
                  value={newIntegration.name}
                  onChange={(e) => setNewIntegration({ ...newIntegration, name: e.target.value })}
                  className="col-span-3"
                  placeholder="e.g., My Custom API"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="integration-type" className="text-right">
                  Type
                </Label>
                <Select value={newIntegration.type} onValueChange={(value) => setNewIntegration({ ...newIntegration, type: value })}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select integration type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="payment">Payment Gateway</SelectItem>
                    <SelectItem value="communication">Communication</SelectItem>
                    <SelectItem value="crm">CRM</SelectItem>
                    <SelectItem value="analytics">Analytics</SelectItem>
                    <SelectItem value="cloud">Cloud Service</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="integration-api-key" className="text-right">
                  API Key
                </Label>
                <Input
                  id="integration-api-key"
                  type="password"
                  value={newIntegration.apiKey}
                  onChange={(e) => setNewIntegration({ ...newIntegration, apiKey: e.target.value })}
                  className="col-span-3"
                  placeholder="Enter API key"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="integration-webhook" className="text-right">
                  Webhook URL
                </Label>
                <Input
                  id="integration-webhook"
                  value={newIntegration.webhookUrl}
                  onChange={(e) => setNewIntegration({ ...newIntegration, webhookUrl: e.target.value })}
                  className="col-span-3"
                  placeholder="https://api.example.com/webhook"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddIntegration}>Add Integration</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {integrations.map((integration) => (
          <Card key={integration.name} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{integration.logo}</span>
                  <div>
                    <CardTitle className="text-sm">{integration.name}</CardTitle>
                  </div>
                </div>
                {getStatusIcon(integration.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Status</span>
                {getStatusBadge(integration.status)}
              </div>
              <div className="text-xs text-muted-foreground">
                Last sync: {integration.lastSync}
              </div>
              <div className="flex gap-2">
                {integration.status === "connected" ? (
                  <>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Settings className="w-3 h-3 mr-1" />
                          Configure
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{integration.name} Configuration</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="api-key">API Key</Label>
                            <Input 
                              id="api-key" 
                              type="password" 
                              placeholder="Enter API key"
                              className="bg-muted border-border"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="webhook-url">Webhook URL</Label>
                            <Input 
                              id="webhook-url" 
                              placeholder="https://api.example.com/webhook"
                              className="bg-muted border-border"
                            />
                          </div>
                          <div className="flex justify-end gap-2">
                            <Button variant="outline">Test Connection</Button>
                            <Button>Save</Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button variant="destructive" size="sm">
                      Disconnect
                    </Button>
                  </>
                ) : (
                  <Button size="sm" className="w-full">
                    Connect
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Integration Health</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-500">5</div>
              <div className="text-sm text-muted-foreground">Active Integrations</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-red-500">2</div>
              <div className="text-sm text-muted-foreground">Disconnected</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-yellow-500">1</div>
              <div className="text-sm text-muted-foreground">Pending</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
