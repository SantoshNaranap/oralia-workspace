
import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Eye, Edit, User } from 'lucide-react'
import type { Tenant } from '@/pages/TenantManagement'

interface TenantQuickViewProps {
  tenant: Tenant
  onClose: () => void
}

export function TenantQuickView({ tenant, onClose }: TenantQuickViewProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'Trial':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'Suspended':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'Churned':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const recentActivities = [
    { time: '2 hours ago', action: 'Bot deployed: Customer Support V2' },
    { time: '1 day ago', action: 'Plan upgraded to Pro' },
    { time: '3 days ago', action: 'New user added: sarah@company.com' },
    { time: '1 week ago', action: 'API key regenerated' },
  ]

  const botList = [
    { name: 'Customer Support Bot', status: 'Active', messages: 12500 },
    { name: 'Sales Assistant', status: 'Active', messages: 8900 },
    { name: 'FAQ Bot', status: 'Paused', messages: 3200 },
  ]

  return (
    <Dialog open={true} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl">{tenant.name}</DialogTitle>
              <p className="text-muted-foreground">{tenant.company}</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">{tenant.plan}</Badge>
              <Badge className={getStatusColor(tenant.status)} variant="outline">
                {tenant.status}
              </Badge>
            </div>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Company Info Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Company Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Industry:</span>
                <span>{tenant.companyInfo.industry}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Company Size:</span>
                <span>{tenant.companyInfo.size} employees</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Contact:</span>
                <span>{tenant.companyInfo.contact}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Region:</span>
                <span>{tenant.region}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Created:</span>
                <span>{new Date(tenant.created).toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>

          {/* Usage Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Resource Usage</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>CPU Usage</span>
                  <span>{tenant.usage.cpu}%</span>
                </div>
                <Progress value={tenant.usage.cpu} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Memory Usage</span>
                  <span>{tenant.usage.memory}%</span>
                </div>
                <Progress value={tenant.usage.memory} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Storage Usage</span>
                  <span>{tenant.usage.storage}%</span>
                </div>
                <Progress value={tenant.usage.storage} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="text-sm">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Bot List Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Active Bots ({tenant.bots})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {botList.map((bot, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium">{bot.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {bot.messages.toLocaleString()} messages
                      </p>
                    </div>
                    <Badge 
                      variant="outline"
                      className={bot.status === 'Active' ? 'text-green-400' : 'text-yellow-400'}
                    >
                      {bot.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="flex justify-between items-center mt-6 pt-6 border-t border-border">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Monthly Revenue:</span>
              <p className="font-semibold text-green-400">{formatCurrency(tenant.revenue)}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Messages/Month:</span>
              <p className="font-semibold">{tenant.messages.toLocaleString()}</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              View Full Details
            </Button>
            <Button variant="outline" size="sm">
              <Edit className="w-4 h-4 mr-2" />
              Edit Tenant
            </Button>
            <Button variant="outline" size="sm">
              <User className="w-4 h-4 mr-2" />
              Impersonate
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
