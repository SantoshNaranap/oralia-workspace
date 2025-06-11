
import React from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { 
  Shield, 
  ShieldOff, 
  MapPin, 
  Clock, 
  Calendar, 
  Activity,
  Key,
  UserX,
  Eye,
  Settings
} from 'lucide-react'
import { User } from '@/pages/UserManagement'

interface UserQuickViewProps {
  user: User | null
  onClose: () => void
}

export function UserQuickView({ user, onClose }: UserQuickViewProps) {
  if (!user) return null

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-500/10 text-green-500 border-green-500/20'
      case 'Suspended':
        return 'bg-red-500/10 text-red-500 border-red-500/20'
      case 'Pending':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
      case 'Inactive':
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20'
      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <Dialog open={!!user} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* User Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-lg font-semibold text-primary">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <h3 className="font-medium">{user.name}</h3>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <Badge variant="outline" className={getStatusColor(user.status)}>
                {user.status}
              </Badge>
              <Badge variant="outline">
                {user.role}
              </Badge>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Quick Actions */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-muted-foreground">Quick Actions</h4>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  Impersonate
                </Button>
                <Button variant="outline" size="sm">
                  <Key className="w-4 h-4 mr-2" />
                  Reset Password
                </Button>
                <Button variant="outline" size="sm">
                  <Shield className="w-4 h-4 mr-2" />
                  Toggle 2FA
                </Button>
                <Button variant="outline" size="sm">
                  <UserX className="w-4 h-4 mr-2" />
                  Suspend
                </Button>
              </div>
            </div>

            {/* Security Info */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">2FA Status</span>
                  <div className="flex items-center gap-2">
                    {user.mfaEnabled ? (
                      <Shield className="w-4 h-4 text-green-500" />
                    ) : (
                      <ShieldOff className="w-4 h-4 text-red-500" />
                    )}
                    <span className="text-sm">
                      {user.mfaEnabled ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">Login Count</span>
                  <span className="text-sm font-medium">{user.loginCount}</span>
                </div>

                {user.ipAddress && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Last IP</span>
                    <span className="text-sm font-mono">{user.ipAddress}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Activity */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span>Last login: {formatDateTime(user.lastLogin)}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <Activity className="w-4 h-4 text-muted-foreground" />
                <span>Last activity: {formatDateTime(user.lastActivity)}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span>Created: {formatDate(user.createdAt)}</span>
              </div>

              {user.location && (
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>{user.location}</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tenant Info */}
          {user.tenantName && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Tenant</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Organization</span>
                    <span className="text-sm font-medium">{user.tenantName}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Tenant ID</span>
                    <span className="text-sm font-mono">{user.tenantId}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Permissions */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Permissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1">
                {user.permissions.map((permission) => (
                  <Badge key={permission} variant="secondary" className="text-xs">
                    {permission}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* Advanced Actions */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-muted-foreground">Advanced</h4>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Settings className="w-4 h-4 mr-2" />
                Security Settings
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Activity className="w-4 h-4 mr-2" />
                View Audit Log
              </Button>
              <Button variant="destructive" size="sm" className="w-full justify-start">
                <UserX className="w-4 h-4 mr-2" />
                Delete User
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
