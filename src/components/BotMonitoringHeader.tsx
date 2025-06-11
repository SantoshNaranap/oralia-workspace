
import React from 'react'
import { Search, Download, Bot } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

interface BotMonitoringHeaderProps {
  totalBots: number
  searchQuery: string
  onSearchChange: (query: string) => void
  statusFilter: 'all' | 'active' | 'inactive' | 'error'
  onStatusFilterChange: (filter: 'all' | 'active' | 'inactive' | 'error') => void
}

export function BotMonitoringHeader({
  totalBots,
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange
}: BotMonitoringHeaderProps) {
  const filterOptions = [
    { value: 'all', label: 'All', variant: 'secondary' as const },
    { value: 'active', label: 'Active', variant: 'default' as const },
    { value: 'inactive', label: 'outline' as const, variant: 'outline' as const },
    { value: 'error', label: 'Error State', variant: 'destructive' as const }
  ]

  return (
    <div className="border-b border-border bg-card">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">Global Bot Registry</h1>
              <p className="text-sm text-muted-foreground">{totalBots} bots total</p>
            </div>
          </div>
          
          <Button className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Bot Data
          </Button>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search bots by name or tenant..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            {filterOptions.map(option => (
              <Badge
                key={option.value}
                variant={statusFilter === option.value ? 'default' : 'outline'}
                className="cursor-pointer hover:bg-muted transition-colors"
                onClick={() => onStatusFilterChange(option.value as any)}
              >
                {option.label}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
