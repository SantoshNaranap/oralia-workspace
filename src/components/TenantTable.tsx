
import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Eye, Edit, User, ChevronDown } from 'lucide-react'
import type { Tenant } from '@/pages/TenantManagement'

interface TenantTableProps {
  tenants: Tenant[]
  onTenantClick: (tenant: Tenant) => void
}

export function TenantTable({ tenants, onTenantClick }: TenantTableProps) {
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

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num)
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="border border-border rounded-lg bg-card">
      <Table>
        <TableHeader>
          <TableRow className="border-border">
            <TableHead className="font-semibold">Tenant Name</TableHead>
            <TableHead className="font-semibold">Company</TableHead>
            <TableHead className="font-semibold">Plan</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="font-semibold">Bots</TableHead>
            <TableHead className="font-semibold">Messages/mo</TableHead>
            <TableHead className="font-semibold">Revenue</TableHead>
            <TableHead className="font-semibold">Created</TableHead>
            <TableHead className="font-semibold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tenants.map((tenant) => (
            <TableRow
              key={tenant.id}
              className="border-border hover:bg-accent/50 cursor-pointer transition-colors"
              onClick={() => onTenantClick(tenant)}
            >
              <TableCell className="font-medium">{tenant.name}</TableCell>
              <TableCell className="text-muted-foreground">{tenant.company}</TableCell>
              <TableCell>
                <Badge variant="outline">{tenant.plan}</Badge>
              </TableCell>
              <TableCell>
                <Badge className={getStatusColor(tenant.status)} variant="outline">
                  {tenant.status}
                </Badge>
              </TableCell>
              <TableCell>{tenant.bots}</TableCell>
              <TableCell>{formatNumber(tenant.messages)}</TableCell>
              <TableCell className="text-green-400">{formatCurrency(tenant.revenue)}</TableCell>
              <TableCell className="text-muted-foreground">{formatDate(tenant.created)}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                    <Button variant="ghost" size="sm">
                      Actions
                      <ChevronDown className="w-4 h-4 ml-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Tenant
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <User className="w-4 h-4 mr-2" />
                      Impersonate
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-400">
                      Suspend Tenant
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
