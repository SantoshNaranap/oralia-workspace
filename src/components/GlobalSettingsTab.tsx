
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

export function GlobalSettingsTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Feature Flags</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="analytics">Advanced Analytics</Label>
              <Switch id="analytics" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="realtime">Real-time Monitoring</Label>
              <Switch id="realtime" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="multiregion">Multi-region Support</Label>
              <Switch id="multiregion" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="backup">Automated Backups</Label>
              <Switch id="backup" defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Rate Limits & Quotas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="api-limit">API Requests per Hour</Label>
              <Input 
                id="api-limit" 
                type="number" 
                defaultValue="10000"
                className="bg-muted border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="upload-limit">Max Upload Size (MB)</Label>
              <Input 
                id="upload-limit" 
                type="number" 
                defaultValue="100"
                className="bg-muted border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="storage-limit">Storage Limit per Tenant (GB)</Label>
              <Input 
                id="storage-limit" 
                type="number" 
                defaultValue="50"
                className="bg-muted border-border"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Regional Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Primary Region</Label>
              <Select defaultValue="us-east-1">
                <SelectTrigger className="bg-muted border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us-east-1">US East (N. Virginia)</SelectItem>
                  <SelectItem value="us-west-2">US West (Oregon)</SelectItem>
                  <SelectItem value="eu-west-1">Europe (Ireland)</SelectItem>
                  <SelectItem value="ap-southeast-1">Asia Pacific (Singapore)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Backup Region</Label>
              <Select defaultValue="us-west-2">
                <SelectTrigger className="bg-muted border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us-east-1">US East (N. Virginia)</SelectItem>
                  <SelectItem value="us-west-2">US West (Oregon)</SelectItem>
                  <SelectItem value="eu-west-1">Europe (Ireland)</SelectItem>
                  <SelectItem value="ap-southeast-1">Asia Pacific (Singapore)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Maintenance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="maintenance-window">Maintenance Window</Label>
              <Select defaultValue="02:00">
                <SelectTrigger className="bg-muted border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="00:00">12:00 AM UTC</SelectItem>
                  <SelectItem value="02:00">2:00 AM UTC</SelectItem>
                  <SelectItem value="04:00">4:00 AM UTC</SelectItem>
                  <SelectItem value="06:00">6:00 AM UTC</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-updates">Automatic Updates</Label>
              <Switch id="auto-updates" defaultChecked />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end gap-3">
        <Button variant="outline">Cancel</Button>
        <Button>Save Changes</Button>
      </div>
    </div>
  )
}
