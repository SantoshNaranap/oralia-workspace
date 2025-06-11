
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Shield, Key, Eye, AlertTriangle } from "lucide-react"

export function SecurityTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Authentication Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="mfa">Multi-Factor Authentication</Label>
              <Switch id="mfa" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="sso">Single Sign-On (SSO)</Label>
              <Switch id="sso" />
            </div>
            <div className="space-y-2">
              <Label>Session Timeout</Label>
              <Select defaultValue="8">
                <SelectTrigger className="bg-muted border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 hour</SelectItem>
                  <SelectItem value="4">4 hours</SelectItem>
                  <SelectItem value="8">8 hours</SelectItem>
                  <SelectItem value="24">24 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password-policy">Password Policy</Label>
              <Select defaultValue="strong">
                <SelectTrigger className="bg-muted border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Basic</SelectItem>
                  <SelectItem value="strong">Strong</SelectItem>
                  <SelectItem value="enterprise">Enterprise</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="w-5 h-5" />
              API Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="api-encryption">API Encryption</Label>
              <Switch id="api-encryption" defaultChecked />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rate-limiting">Rate Limiting</Label>
              <Input 
                id="rate-limiting" 
                type="number" 
                defaultValue="1000"
                className="bg-muted border-border"
                placeholder="Requests per minute"
              />
            </div>
            <div className="space-y-2">
              <Label>IP Whitelist</Label>
              <Input 
                placeholder="192.168.1.0/24, 10.0.0.0/8"
                className="bg-muted border-border"
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="cors">CORS Protection</Label>
              <Switch id="cors" defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Audit & Monitoring
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="audit-logs">Audit Logging</Label>
              <Switch id="audit-logs" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="login-monitoring">Login Monitoring</Label>
              <Switch id="login-monitoring" defaultChecked />
            </div>
            <div className="space-y-2">
              <Label>Log Retention Period</Label>
              <Select defaultValue="90">
                <SelectTrigger className="bg-muted border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 days</SelectItem>
                  <SelectItem value="90">90 days</SelectItem>
                  <SelectItem value="180">180 days</SelectItem>
                  <SelectItem value="365">1 year</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="anomaly-detection">Anomaly Detection</Label>
              <Switch id="anomaly-detection" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Security Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">Failed Login Attempts</div>
                  <div className="text-sm text-muted-foreground">5 attempts in last hour</div>
                </div>
                <Badge variant="destructive">High</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">Suspicious API Activity</div>
                  <div className="text-sm text-muted-foreground">Unusual patterns detected</div>
                </div>
                <Badge variant="secondary">Medium</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">Certificate Expiry</div>
                  <div className="text-sm text-muted-foreground">SSL cert expires in 30 days</div>
                </div>
                <Badge variant="secondary">Low</Badge>
              </div>
            </div>
            <Button className="w-full" variant="outline">View All Alerts</Button>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end gap-3">
        <Button variant="outline">Reset to Defaults</Button>
        <Button>Save Security Settings</Button>
      </div>
    </div>
  )
}
