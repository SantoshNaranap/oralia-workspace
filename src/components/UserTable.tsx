
import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal, Shield, ShieldOff, Key, UserX, Eye } from 'lucide-react'
import { User } from '@/pages/UserManagement'

interface UserTableProps {
  users: User[]
  onUserClick: (user: User) => void
}

export function UserTable({ users, onUserClick }: UserTableProps) {
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

  const getRoleColor = (category: string) => {
    switch (category) {
      case 'workspace':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20'
      case 'tenant':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20'
      case 'enduser':
        return 'bg-green-500/10 text-green-400 border-green-500/20'
      default:
        return 'bg-gray-500/10 text-gray-400 border-gray-500/20'
    }
  }

  const formatLastLogin = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    
    if (hours < 1) return 'Just now'
    if (hours < 24) return `${hours}h ago`
    
    const days = Math.floor(hours / 24)
    if (days < 7) return `${days}d ago`
    
    return date.toLocaleDateString()
  }

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-12">
              <Checkbox />
            </TableHead>
            <TableHead>User</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Tenant</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>2FA</TableHead>
            <TableHead>Last Login</TableHead>
            <TableHead>Location</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow 
              key={user.id} 
              className="cursor-pointer hover:bg-muted/30 transition-colors"
              onClick={() => onUserClick(user)}
            >
              <TableCell onClick={(e) => e.stopPropagation()}>
                <Checkbox />
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-medium">{user.name}</span>
                  <span className="text-sm text-muted-foreground">{user.email}</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className={getRoleColor(user.category)}>
                  {user.role}
                </Badge>
              </TableCell>
              <TableCell>
                {user.tenantName ? (
                  <span className="text-sm">{user.tenantName}</span>
                ) : (
                  <span className="text-sm text-muted-foreground">-</span>
                )}
              </TableCell>
              <TableCell>
                <Badge variant="outline" className={getStatusColor(user.status)}>
                  {user.status}
                </Badge>
              </TableCell>
              <TableCell>
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
              </TableCell>
              <TableCell>
                <span className="text-sm">{formatLastLogin(user.lastLogin)}</span>
              </TableCell>
              <TableCell>
                <span className="text-sm text-muted-foreground">{user.location || '-'}</span>
              </TableCell>
              <TableCell onClick={(e) => e.stopPropagation()}>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Key className="w-4 h-4 mr-2" />
                      Reset Password
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Shield className="w-4 h-4 mr-2" />
                      Toggle 2FA
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <UserX className="w-4 h-4 mr-2" />
                      Suspend User
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
