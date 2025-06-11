
import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { RefreshCw, CreditCard, FileText, Calculator, DollarSign } from 'lucide-react'

export function BillingOperations() {
  const [refundAmount, setRefundAmount] = useState('')
  const [creditAmount, setCreditAmount] = useState('')
  const [usageUnits, setUsageUnits] = useState('')

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="refund-amount">Process Refund</Label>
            <div className="flex gap-2">
              <Input
                id="refund-amount"
                placeholder="Amount"
                value={refundAmount}
                onChange={(e) => setRefundAmount(e.target.value)}
              />
              <Button size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refund
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="credit-amount">Apply Credit</Label>
            <div className="flex gap-2">
              <Input
                id="credit-amount"
                placeholder="Credit amount"
                value={creditAmount}
                onChange={(e) => setCreditAmount(e.target.value)}
              />
              <Button size="sm" variant="outline">
                <CreditCard className="w-4 h-4 mr-2" />
                Apply
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Generate Invoice</Label>
            <div className="flex gap-2">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select tenant" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="techcorp">TechCorp Inc</SelectItem>
                  <SelectItem value="startup">StartupXYZ</SelectItem>
                  <SelectItem value="enterprise">Enterprise Co</SelectItem>
                </SelectContent>
              </Select>
              <Button size="sm" variant="outline">
                <FileText className="w-4 h-4 mr-2" />
                Generate
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Subscription Modification</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Tenant</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select tenant" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="techcorp">TechCorp Inc</SelectItem>
                <SelectItem value="startup">StartupXYZ</SelectItem>
                <SelectItem value="enterprise">Enterprise Co</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>New Plan</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="starter">Starter - $299/mo</SelectItem>
                <SelectItem value="professional">Professional - $890/mo</SelectItem>
                <SelectItem value="enterprise">Enterprise - $2,500/mo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button className="w-full" variant="outline">
            Update Subscription
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            Usage Overage Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="usage-units">Usage Units</Label>
            <Input
              id="usage-units"
              placeholder="Enter usage units"
              value={usageUnits}
              onChange={(e) => setUsageUnits(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Rate per Unit</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select rate" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0.05">$0.05 per unit</SelectItem>
                <SelectItem value="0.10">$0.10 per unit</SelectItem>
                <SelectItem value="0.15">$0.15 per unit</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Estimated Overage:</span>
            <span className="text-lg font-bold">
              ${usageUnits ? (parseFloat(usageUnits) * 0.10).toFixed(2) : '0.00'}
            </span>
          </div>

          <Button className="w-full">
            Calculate & Apply
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
