
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit, Trash2, Plus } from "lucide-react"

export function PlansAndPricingTab() {
  const plans = [
    { name: "Starter", price: "$29", users: "Up to 5", storage: "10GB", support: "Email" },
    { name: "Professional", price: "$99", users: "Up to 25", storage: "100GB", support: "Priority" },
    { name: "Enterprise", price: "$299", users: "Unlimited", storage: "1TB", support: "24/7 Phone" }
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Plan Management</h3>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add New Plan
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current Plans</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Plan Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Users</TableHead>
                <TableHead>Storage</TableHead>
                <TableHead>Support</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {plans.map((plan) => (
                <TableRow key={plan.name}>
                  <TableCell className="font-medium">{plan.name}</TableCell>
                  <TableCell>{plan.price}</TableCell>
                  <TableCell>{plan.users}</TableCell>
                  <TableCell>{plan.storage}</TableCell>
                  <TableCell>{plan.support}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Feature Assignment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg bg-muted/30">
                <span>Advanced Analytics</span>
                <Badge variant="secondary">Pro+</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg bg-muted/30">
                <span>Real-time Monitoring</span>
                <Badge variant="secondary">All Plans</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg bg-muted/30">
                <span>API Access</span>
                <Badge variant="secondary">Pro+</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg bg-muted/30">
                <span>Custom Integrations</span>
                <Badge variant="secondary">Enterprise</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resource Limits</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label>API Requests per Month</Label>
              <Slider defaultValue={[10000]} max={100000} step={1000} className="w-full" />
              <div className="text-sm text-muted-foreground">10,000 requests</div>
            </div>
            <div className="space-y-3">
              <Label>Storage Limit (GB)</Label>
              <Slider defaultValue={[100]} max={1000} step={10} className="w-full" />
              <div className="text-sm text-muted-foreground">100 GB</div>
            </div>
            <div className="space-y-3">
              <Label>Concurrent Users</Label>
              <Slider defaultValue={[25]} max={500} step={5} className="w-full" />
              <div className="text-sm text-muted-foreground">25 users</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pricing Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="starter-price">Starter Plan Price</Label>
              <Input 
                id="starter-price" 
                defaultValue="29"
                className="bg-muted border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pro-price">Professional Plan Price</Label>
              <Input 
                id="pro-price" 
                defaultValue="99"
                className="bg-muted border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="enterprise-price">Enterprise Plan Price</Label>
              <Input 
                id="enterprise-price" 
                defaultValue="299"
                className="bg-muted border-border"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Button variant="outline">Cancel</Button>
        <Button>Save Changes</Button>
      </div>
    </div>
  )
}
